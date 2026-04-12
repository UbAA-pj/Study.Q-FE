import { useEffect, useState } from 'react';
import Button from '../components/common/Button';
import CreateCourse from '../components/common/createCourse/CreateCourse';
import QuizBox from '../components/common/QuizBox';
import { DUMMY_QUIZZES } from '../data/quizzes';
import VideoUpload from '../components/common/createCourse/VideoUpload.jsx';
import { useNavigate } from 'react-router-dom';

const CreateCoursePage = () => {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    title: '',
    category: '',
    description: '',
  });
  const selectOptions = [
    '소프트웨어 공학',
    '데이터 베이스',
    '소프트웨어 개발 실습1',
  ];

  const [video, setVideo] = useState(null);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const [quizzes, setQuizzes] = useState([]);

  // 미리보기 URL 생성
  useEffect(() => {
    if (!video) return;

    const url = URL.createObjectURL(video);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [video]);

  // 폼 유효성 검사
  const isFormValid =
    courseData.title.trim() !== '' &&
    courseData.category !== '' &&
    isVideoUploaded;

  const handleGenerateQuiz = async () => {
    try {
      // 나중에 API 연결
      setQuizzes(DUMMY_QUIZZES);
    } catch (err) {
      console.error('퀴즈 생성 실패:', err);
    }
  };

  const handleCreateCourse = async () => {
    try {
      //  API 연결
      console.log('강의 생성 데이터:', {
        courseData,
        video,
      });

      navigate('/courses');
    } catch (err) {
      console.error('강의 생성 실패:', err);
    }
  };

  return (
    <div className="px-8 py-8 flex flex-col gap-4">
      {/* 강의 기본 정보 */}
      <CreateCourse
        value={courseData}
        onChange={setCourseData}
        selectOptions={selectOptions}
      />

      {/* 영상 업로드 + 퀴즈 생성 */}
      <div className="flex justify-end gap-2">
        <VideoUpload
          setVideo={setVideo}
          onUploadComplete={() => setIsVideoUploaded(true)}
        />
        <Button
          variant="primary"
          disabled={!isVideoUploaded}
          onClick={handleGenerateQuiz}
        >
          퀴즈 생성
        </Button>
      </div>

      {/* 영상 미리보기 */}
      {previewUrl && (
        <div className="flex flex-col gap-2">
          <p className="text-xl">업로드한 강의 영상 미리보기</p>
          <video
            controls
            className="w-full max-w-md rounded-md"
            src={previewUrl}
          />
        </div>
      )}

      {/* 퀴즈 리스트 */}
      {quizzes.length > 0 &&
        quizzes.map((item) => (
          <QuizBox
            key={`${item.lectureId}-${item.quizzes.length}`}
            lectureName={item.lectureName}
            quizzes={item.quizzes}
          />
        ))}

      {/* 에러 메시지 */}
      {!isFormValid && (
        <p className="text-sm text-red-500">
          강의 제목, 강의 선택, 동영상 업로드는 필수입니다
        </p>
      )}

      {/* 최종 생성 버튼 */}
      <Button
        variant="primary"
        disabled={!isFormValid}
        onClick={handleCreateCourse}
      >
        강의 생성
      </Button>
    </div>
  );
};

export default CreateCoursePage;
