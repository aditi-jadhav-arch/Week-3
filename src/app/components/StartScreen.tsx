import { PlayCircle, BookOpen, Clock, Target } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  totalQuestions: number;
  timeLimit: number;
}

export function StartScreen({
  onStart,
  totalQuestions,
  timeLimit,
}: StartScreenProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-blue-600" />
        </div>

        <h1 className="text-4xl mb-4">Welcome to the Quiz</h1>
        <p className="text-gray-600 mb-8">
          Test your knowledge with this interactive quiz. Read each question
          carefully and select the best answer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-6">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl mb-1">{totalQuestions}</div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl mb-1">
              {Math.floor(timeLimit / 60)} min
            </div>
            <div className="text-sm text-gray-600">Time Limit</div>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <PlayCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl mb-1">60%</div>
            <div className="text-sm text-gray-600">Pass Score</div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2 text-yellow-900">Instructions:</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Select one answer for each question</li>
            <li>• You can navigate between questions</li>
            <li>• Complete the quiz before time runs out</li>
            <li>• Your score will be shown at the end</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto text-lg"
        >
          <PlayCircle className="w-6 h-6" />
          Start Quiz
        </button>
      </div>
    </div>
  );
}
