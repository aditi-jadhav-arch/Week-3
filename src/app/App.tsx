import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Question } from './components/Question';
import { Timer } from './components/Timer';
import { Result } from './components/Result';
import { StartScreen } from './components/StartScreen';
import { DetailedReport } from './components/DetailedReport';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizData: QuizQuestion[] = [
  {
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 3,
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
    correctAnswer: 1,
  },
  {
    question: 'What is the smallest prime number?',
    options: ['0', '1', '2', '3'],
    correctAnswer: 2,
  },
  {
    question: 'Which element has the chemical symbol "O"?',
    options: ['Gold', 'Oxygen', 'Silver', 'Osmium'],
    correctAnswer: 1,
  },
  {
    question: 'In what year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: 2,
  },
  {
    question: 'What is the largest mammal in the world?',
    options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
    correctAnswer: 1,
  },
  {
    question: 'Which programming language is known for web development?',
    options: ['Python', 'C++', 'JavaScript', 'Swift'],
    correctAnswer: 2,
  },
  {
    question: 'What is the speed of light in vacuum?',
    options: ['299,792 km/s', '150,000 km/s', '500,000 km/s', '1,000,000 km/s'],
    correctAnswer: 0,
  },
];

type QuizState = 'start' | 'playing' | 'finished' | 'report';

export default function App() {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    Array(quizData.length).fill(null)
  );
  const [score, setScore] = useState(0);

  const TIME_LIMIT = 300; // 5 minutes in seconds

  const handleStart = () => {
    setQuizState('playing');
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(quizData.length).fill(null));
    setScore(0);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const calculatedScore = userAnswers.reduce((acc, answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(calculatedScore);
    setQuizState('finished');
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  const handleRestart = () => {
    setQuizState('start');
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(quizData.length).fill(null));
    setScore(0);
  };

  const handleViewReport = () => {
    setQuizState('report');
  };

  const handleBackToResults = () => {
    setQuizState('finished');
  };

  const isLastQuestion = currentQuestionIndex === quizData.length - 1;
  const allQuestionsAnswered = userAnswers.every((answer) => answer !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {quizState === 'start' && (
          <StartScreen
            onStart={handleStart}
            totalQuestions={quizData.length}
            timeLimit={TIME_LIMIT}
          />
        )}

        {quizState === 'playing' && (
          <>
            <div className="mb-6">
              <Timer
                totalTime={TIME_LIMIT}
                onTimeUp={handleTimeUp}
                isActive={true}
              />
            </div>

            <Question
              question={quizData[currentQuestionIndex].question}
              options={quizData[currentQuestionIndex].options}
              currentQuestion={currentQuestionIndex}
              totalQuestions={quizData.length}
              selectedAnswer={userAnswers[currentQuestionIndex]}
              onSelectAnswer={handleSelectAnswer}
            />

            <div className="flex justify-between items-center max-w-2xl mx-auto">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              {isLastQuestion ? (
                <button
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered}
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
                    allQuestionsAnswered
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-5 h-5" />
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </>
        )}

        {quizState === 'finished' && (
          <Result
            score={score}
            totalQuestions={quizData.length}
            onRestart={handleRestart}
            onViewReport={handleViewReport}
          />
        )}

        {quizState === 'report' && (
          <DetailedReport
            questions={quizData}
            userAnswers={userAnswers}
            onBack={handleBackToResults}
          />
        )}
      </div>
    </div>
  );
}