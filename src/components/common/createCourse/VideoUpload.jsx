import { useRef } from 'react';
import Button from '../Button';
import { Video } from 'lucide-react';

export default function VideoUpload({ setVideo, onUploadComplete }) {
  const fileRef = useRef(null);

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideo(file);
    onUploadComplete?.();
  };

  return (
    <>
      <Button icon={<Video />} onClick={handleClick}>
        동영상 업로드
      </Button>

      <input
        type="file"
        accept="video/*"
        ref={fileRef}
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}
