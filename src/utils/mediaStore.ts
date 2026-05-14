const DB_NAME = 'ifix_media_store';
const DB_VERSION = 1;
const STORE_NAME = 'media';
const MEDIA_PREFIX = 'ifix-media:';

export interface StoredMedia {
  id: string;
  name: string;
  type: string;
  blob: Blob;
  createdAt: number;
}

export interface ResolvedMedia {
  url: string;
  type: string;
  revoke?: () => void;
}

function openMediaDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transaction<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openMediaDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, mode);
        const request = run(tx.objectStore(STORE_NAME));

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        tx.oncomplete = () => db.close();
        tx.onerror = () => {
          reject(tx.error);
          db.close();
        };
      })
  );
}

export function isStoredMediaRef(value: string) {
  return value.startsWith(MEDIA_PREFIX);
}

export function getStoredMediaId(value: string) {
  return value.slice(MEDIA_PREFIX.length);
}

export async function saveMediaFile(file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const id = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const media: StoredMedia = {
    id,
    name: file.name,
    type: file.type,
    blob: file,
    createdAt: Date.now(),
  };

  await transaction('readwrite', (store) => store.put(media));
  return `${MEDIA_PREFIX}${id}`;
}

export async function getStoredMedia(ref: string): Promise<StoredMedia | null> {
  if (!isStoredMediaRef(ref)) return null;
  const result = await transaction<StoredMedia | undefined>('readonly', (store) =>
    store.get(getStoredMediaId(ref))
  );
  return result ?? null;
}

export async function resolveMedia(ref: string): Promise<ResolvedMedia | null> {
  if (!ref) return null;
  if (!isStoredMediaRef(ref)) return { url: ref, type: mediaTypeFromUrl(ref) };

  const media = await getStoredMedia(ref);
  if (!media) return null;

  const url = URL.createObjectURL(media.blob);
  return {
    url,
    type: media.type,
    revoke: () => URL.revokeObjectURL(url),
  };
}

export function isVideoMedia(src: string, type = '') {
  const lower = src.toLowerCase();
  return (
    type.startsWith('video/') ||
    lower.startsWith('data:video/') ||
    /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/.test(lower)
  );
}

function mediaTypeFromUrl(url: string) {
  const lower = url.toLowerCase();
  if (lower.startsWith('data:')) return lower.slice(5, lower.indexOf(';'));
  if (isVideoMedia(lower)) return 'video/*';
  if (/\.(gif|png|jpe?g|webp|avif|svg)(\?|#|$)/.test(lower)) return 'image/*';
  return '';
}
