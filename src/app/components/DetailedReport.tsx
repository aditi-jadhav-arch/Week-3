import { CheckCircle2, XCircle, ArrowLeft, FileText } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface DetailedReportProps {
  questions: Question[];
  userAnswers: (number | null)[];
  onBack: () => void;
}

export function DetailedReport({
  questions,
  userAnswers,
  onBack,
}: DetailedReportProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl">Detailed Report</h2>
              <p className="text-sm text-gray-600">
                Review your answers for all questions
              </p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const wasAnswered = userAnswer !== null;

            return (
              <div
                key={index}
                className={`border-2 rounded-lg p-6 transition-all ${
                  isCorrect
                    ? 'border-green-200 bg-green-50'
                    : wasAnswered
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect
                        ? 'bg-green-600'
                        : wasAnswered
                        ? 'bg-red-600'
                        : 'bg-gray-600'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <XCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-600">
                        Question {index + 1}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          isCorrect
                            ? 'bg-green-600 text-white'
                            : wasAnswered
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-600 text-white'
                        }`}
                      >
                        {isCorrect
                          ? 'Correct'
                          : wasAnswered
                          ? 'Incorrect'
                          : 'Not Answered'}
                      </span>
                    </div>
                    <h3 className="text-lg mb-4">{question.question}</h3>

                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswer === optionIndex;
                        const isCorrectAnswer =
                          question.correctAnswer === optionIndex;

                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              isCorrectAnswer
                                ? 'border-green-500 bg-green-100'
                                : isUserAnswer
                                ? 'border-red-500 bg-red-100'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm md:text-base">
                                {option}
                              </span>
                              <div className="flex items-center gap-2">
                                {isCorrectAnswer && (
                                  <span className="text-xs font-semibold text-green-700 bg-green-200 px-2 py-1 rounded">
                                    Correct Answer
                                  </span>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <span className="text-xs font-semibold text-red-700 bg-red-200 px-2 py-1 rounded">
                                    Your Answer
                                  </span>
                                )}
                                {isUserAnswer && isCorrectAnswer && (
                                  <span className="text-xs font-semibold text-green-700 bg-green-200 px-2 py-1 rounded">
                                    Your Answer ✓
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {!wasAnswered && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          You did not answer this question.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Summary
          </button>
        </div>
      </div>
    </div>
  );
}
