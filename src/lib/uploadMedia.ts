import imageCompression from 'browser-image-compression'
import { supabase } from './supabase'

const BUCKET_NAME = 'site-media'

const MAX_IMAGE_SIZE_MB = 2
const MAX_VIDEO_SIZE_MB = 20
const MAX_IMAGE_WIDTH_OR_HEIGHT = 1920

export type UploadMediaResult = {
  url: string
  fileName: string
  fileType: string
  originalSizeMb: number
  finalSizeMb: number
  wasCompressed: boolean
}

function bytesToMb(bytes: number) {
  return Number((bytes / 1024 / 1024).toFixed(2))
}

function createSafeFileName(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'file'

  const cleanName = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)

  const safeName = cleanName || 'media'

  return `${Date.now()}-${safeName}.${extension}`
}

export async function uploadMediaFile(file: File): Promise<UploadMediaResult> {
  const originalSizeMb = bytesToMb(file.size)

  const isImage = file.type.startsWith('image/')
  const isVideo = file.type.startsWith('video/')

  if (!isImage && !isVideo) {
    throw new Error('Можно загружать только фото или видео.')
  }

  let fileToUpload = file
  let wasCompressed = false

  if (isImage) {
    fileToUpload = await imageCompression(file, {
      maxSizeMB: MAX_IMAGE_SIZE_MB,
      maxWidthOrHeight: MAX_IMAGE_WIDTH_OR_HEIGHT,
      useWebWorker: true,
    })

    wasCompressed = fileToUpload.size < file.size

    if (bytesToMb(fileToUpload.size) > MAX_IMAGE_SIZE_MB) {
      throw new Error(`Фото слишком большое. Максимум ${MAX_IMAGE_SIZE_MB} МБ.`)
    }
  }

  if (isVideo && originalSizeMb > MAX_VIDEO_SIZE_MB) {
    throw new Error(`Видео слишком большое. Максимум ${MAX_VIDEO_SIZE_MB} МБ.`)
  }

  const fileName = createSafeFileName(fileToUpload)
  const folder = isImage ? 'images' : 'videos'
  const filePath = `${folder}/${fileName}`

  const result = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, fileToUpload, {
      cacheControl: '3600',
      upsert: true,
    })

  console.log('UPLOAD RESULT', result)

  const { error } = result

  if (error) {
    throw new Error(`Ошибка загрузки файла: ${error.message}`)
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)

  return {
    url: publicUrlData.publicUrl,
    fileName,
    fileType: fileToUpload.type,
    originalSizeMb,
    finalSizeMb: bytesToMb(fileToUpload.size),
    wasCompressed,
  }
}