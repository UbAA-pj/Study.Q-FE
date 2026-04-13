import { useEffect, useState } from 'react';
import Button from '../components/common/Button';
import CreateCourse from '../components/common/createCourse/CreateCourse';
import QuizBox from '../components/common/QuizBox';
import { DUMMY_QUIZZES } from '../data/quizzes';
import VideoUpload from '../components/common/createCourse/VideoUpload.jsx';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { auth } from '../firebase';

const CreateCoursePage = () => {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    title: '',
    category: '',
    description: '',
  });
  const [selectOptions, setSelectOptions] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    api.get('/api/courses/').then((res) => {
      const courses = res.data.courses || [];
      const uid = auth.currentUser?.uid;
      const myCourses = uid
        ? courses.filter((c) => c.instructor_id === uid)
        : courses;
      setCoursesData(myCourses);
      setSelectOptions(myCourses.map((c) => c.course_name));
    }).catch((err) => {
      console.error('강좌 목록 조회 실패:', err);
    });
  }, []);

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
      // 선택한 강좌에서 course_id 찾기
      const selectedCourse = coursesData.find((c) => c.course_name === courseData.category);

      const formData = new FormData();
      formData.append('course_id', selectedCourse?.id || '');
      formData.append('title', courseData.title);
      formData.append('order', 1);
      formData.append('category', courseData.category);
      formData.append('description', courseData.description);
      formData.append('video', video);

      await api.post('/api/lectures/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/');
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
