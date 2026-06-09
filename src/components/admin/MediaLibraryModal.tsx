import { useEffect, useState } from 'react'
import { getMediaFiles, deleteMediaFile, type MediaFile } from '../../lib/mediaLibrary'

type MediaLibraryModalProps = {
  isOpen: boolean
  onClose: () => void
  onSelect: (file: MediaFile) => void
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  onSelect,
}: MediaLibraryModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(false)

  async function loadFiles() {
    try {
      setLoading(true)
      const result = await getMediaFiles()
      setFiles(result)
    } catch (error) {
      console.error('Ошибка загрузки медиатеки:', error)
      alert('Не удалось загрузить медиатеку')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(file: MediaFile) {
    const confirmed = confirm(`Удалить файл "${file.file_name}"?`)

    if (!confirmed) return

    try {
      await deleteMediaFile(file)
      await loadFiles()
    } catch (error) {
      console.error('Ошибка удаления файла:', error)
      alert('Не удалось удалить файл')
    }
  }

  useEffect(() => {
    if (isOpen) {
      loadFiles()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Медиатека</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Закрыть
          </button>
        </div>

        {loading && <p>Загружаем файлы...</p>}

        {!loading && files.length === 0 && (
          <p className="text-gray-500">Файлов пока нет.</p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {files.map((file) => (
            <div key={file.id} className="rounded-2xl border p-3">
              <div className="mb-3 h-40 overflow-hidden rounded-xl bg-gray-100">
                {file.file_type.startsWith('video') ? (
                  <video
                    src={file.url}
                    className="h-full w-full object-cover"
                    muted
                    controls
                  />
                ) : (
                  <img
                    src={file.url}
                    alt={file.file_name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <p className="mb-3 truncate text-sm">{file.file_name}</p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelect(file)
                    onClose()
                  }}
                  className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-sm text-white"
                >
                  Выбрать
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(file)}
                  className="rounded-xl border px-3 py-2 text-sm text-red-600"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}