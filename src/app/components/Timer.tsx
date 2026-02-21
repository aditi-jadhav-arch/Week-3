import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  totalTime: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

export function Timer({ totalTime, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp, isActive]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / totalTime) * 100;
  const isWarning = percentage < 20;

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg shadow-md p-4">
      <Clock
        className={`w-5 h-5 ${isWarning ? 'text-red-600' : 'text-blue-600'}`}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Time Remaining</span>
          <span
            className={`font-mono ${
              isWarning ? 'text-red-600' : 'text-gray-900'
            }`}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              isWarning ? 'bg-red-600' : 'bg-blue-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
