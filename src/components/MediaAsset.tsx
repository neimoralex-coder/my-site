import { useEffect, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { isVideoMedia, resolveMedia } from '../utils/mediaStore';

interface MediaAssetProps {
  src: string;
  alt?: string;
  className?: string;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
}

export default function MediaAsset({
  src,
  alt = '',
  className = '',
  controls = false,
  muted = true,
  loop = true,
  autoPlay = true,
}: MediaAssetProps) {
  const [media, setMedia] = useState<{ url: string; type: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    let revoke: (() => void) | undefined;

    resolveMedia(src)
      .then((resolved) => {
        if (cancelled) {
          resolved?.revoke?.();
          return;
        }
        revoke = resolved?.revoke;
        setMedia(resolved ? { url: resolved.url, type: resolved.type } : null);
      })
      .catch(() => setMedia(null));

    return () => {
      cancelled = true;
      revoke?.();
    };
  }, [src]);

  if (!src) return null;

  if (!media) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}>
        <ImageIcon className="w-6 h-6" />
      </div>
    );
  }

  if (isVideoMedia(media.url, media.type)) {
    return (
      <video
        src={media.url}
        className={className}
        controls={controls}
        muted={muted}
        loop={loop}
        autoPlay={autoPlay}
        playsInline
      />
    );
  }

  return <img src={media.url} alt={alt} className={className} />;
}
