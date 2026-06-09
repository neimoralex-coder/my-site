import { useRef, useState } from 'react'
import { uploadMediaFile, type MediaFile } from '../../lib/mediaLibrary'
import MediaLibraryModal from './MediaLibraryModal'

type MediaPickerProps = {
  label?: string
  value?: string
  onChange: (file: MediaFile) => void
}

export default function MediaPicker({
  label = 'Медиафайл',
  value,
  onChange,
}: MediaPickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    try {
      setUploading(true)

      const uploadedFile = await uploadMediaFile(file)

      onChange(uploadedFile)
    } catch (error) {
      console.error('Ошибка загрузки файла:', error)
      alert('Не удалось загрузить файл')
    } finally {
      setUploading(false)

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div className="rounded-2xl border p-4">
      <p className="mb-3 font-medium">{label}</p>

      {value && (
        <div className="mb-4 overflow-hidden rounded-xl border bg-gray-100">
          {value.match(/\.(mp4|webm|mov)$/i) ? (
            <video src={value} className="max-h-64 w-full object-cover" controls />
          ) : (
            <img src={value} alt="" className="max-h-64 w-full object-cover" />
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-xl bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {uploading ? 'Загрузка...' : 'Загрузить новый'}
        </button>

        <button
          type="button"
          onClick={() => setLibraryOpen(true)}
          className="rounded-xl border px-4 py-2"
        >
          Из библиотеки
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*,.gif"
        onChange={handleFileChange}
        className="hidden"
      />

      <MediaLibraryModal
        isOpen={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onSelect={onChange}
      />
    </div>
  )
}