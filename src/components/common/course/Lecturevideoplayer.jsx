import { useEffect, useRef, useState } from 'react';
import QuizModal from './QuizModal';

const LectureVideoPlayer = ({ videoUrl, quizzes = [] }) => {
  const videoRef = useRef(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const triggeredRef = useRef(new Set());

  useEffect(() => {
    const video = videoRef.current;
    if (!video || quizzes.length === 0) return;

    const sorted = [...quizzes].sort((a, b) => (a.trigger_time || 0) - (b.trigger_time || 0));

    const handleTimeUpdate = () => {
      if (activeQuiz) return;

      for (const quiz of sorted) {
        if (triggeredRef.current.has(quiz.id)) continue;
        if (video.currentTime >= quiz.trigger_time) {
          triggeredRef.current.add(quiz.id);
          video.pause();
          setActiveQuiz(quiz);
          break;
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [quizzes, activeQuiz]);

  const handleQuizClose = () => {
    setActiveQuiz(null);
    videoRef.current?.play();
  };

  return (
    <div className="relative w-full">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full rounded-xl"
      />

      {activeQuiz && <QuizModal quiz={activeQuiz} onClose={handleQuizClose} />}
    </div>
  );
};

export default LectureVideoPlayer;
