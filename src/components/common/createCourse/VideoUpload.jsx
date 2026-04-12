import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { Video } from 'lucide-react';

export default function VideoUpload() {
  const fileRef = useRef(null);
  const [video, setVideo] = useState(null);

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
    }
  };

  useEffect(() => {
    return () => {
      if (video) URL.revokeObjectURL(video);
    };
  }, [video]);

  return (
    <div className="flex flex-col gap-3">
      {/* 버튼 */}
      <Button icon={<Video />} onClick={handleClick}>
        동영상 업로드
      </Button>

      {/* 숨겨진 input */}
      <input
        type="file"
        accept="video/*"
        ref={fileRef}
        className="hidden"
        onChange={handleChange}
      />

      {/* 미리보기 */}
      {video && (
        <video
          controls
          className="w-full max-w-md rounded-md"
          src={URL.createObjectURL(video)}
        />
      )}
    </div>
  );
}
