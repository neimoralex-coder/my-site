import { supabase } from './supabase'

const BUCKET_NAME = 'site-media'

export type MediaFile = {
  id: string
  url: string
  file_name: string
  file_type: string
  file_size: number | null
  storage_path: string | null
  created_at: string
}

function createSafeFileName(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'file'

  const cleanName = file.name
    .replace(/\.[^/.]+$/, '')
     .replace(/[^a-zA-Z0-9_-]/g, '-')
    .slice(0, 40)

  return `${Date.now()}-${cleanName}.${extension}`
}

export async function uploadMediaFile(file: File) {
  const fileName = createSafeFileName(file)
  const storagePath = `uploads/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, file)

  if (uploadError) {
    throw uploadError
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storagePath)

  const url = publicUrlData.publicUrl

  const { data, error: insertError } = await supabase
    .from('media_files')
    .insert({
      url,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
      storage_path: storagePath,
    })
    .select()
    .single()

  if (insertError) {
    throw insertError
  }

  return data as MediaFile
}

export async function getMediaFiles() {
  const { data, error } = await supabase
    .from('media_files')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data as MediaFile[]
}

export async function deleteMediaFile(mediaFile: MediaFile) {
  if (mediaFile.storage_path) {
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([mediaFile.storage_path])

    if (storageError) {
      throw storageError
    }
  }

  const { error: deleteError } = await supabase
    .from('media_files')
    .delete()
    .eq('id', mediaFile.id)

  if (deleteError) {
    throw deleteError
  }
}