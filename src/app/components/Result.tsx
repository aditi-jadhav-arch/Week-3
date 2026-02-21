import { Trophy, Target, CheckCircle2, XCircle, RotateCcw, FileText } from 'lucide-react';

interface ResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onViewReport: () => void;
}

export function Result({ score, totalQuestions, onRestart, onViewReport }: ResultProps) {
  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 60;

  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-500' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-500' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-500' };
    if (percentage >= 50) return { grade: 'D', color: 'text-orange-500' };
    return { grade: 'F', color: 'text-red-600' };
  };

  const { grade, color } = getGrade();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div
          className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          <Trophy
            className={`w-12 h-12 ${passed ? 'text-green-600' : 'text-red-600'}`}
          />
        </div>

        <h2 className="text-3xl mb-2">Quiz Completed!</h2>
        <p className="text-gray-600 mb-8">
          {passed
            ? 'Congratulations! You passed the quiz.'
            : "Don't worry, you can try again!"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-6">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl mb-1">{score}</div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>

          <div className={`${passed ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-6`}>
            <div className={`text-5xl mb-1 ${color}`}>{grade}</div>
            <div className="text-sm text-gray-600">Grade</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <div className="text-3xl mb-1">{percentage.toFixed(0)}%</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Breakdown</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Correct</span>
              </div>
              <span className="font-semibold">{score}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span>Incorrect</span>
              </div>
              <span className="font-semibold">{totalQuestions - score}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Restart Quiz
        </button>

        <button
          onClick={onViewReport}
          className="w-full md:w-auto px-8 py-3 mt-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <FileText className="w-5 h-5" />
          View Detailed Report
        </button>
      </div>
    </div>
  );
}