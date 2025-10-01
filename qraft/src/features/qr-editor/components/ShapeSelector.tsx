'use client';

interface ShapeSelectorProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string; preview?: string }>;
  onChange: (value: string) => void;
}

export function ShapeSelector({ label, value, options, onChange }: ShapeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-3 border-2 rounded-lg transition-all ${
              value === option.value
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}
          >
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
              {option.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
