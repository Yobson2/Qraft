'use client';

import { ColorPicker } from './ColorPicker';

interface ControlsPanelProps {
  payload: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  onPayloadChange: (payload: string) => void;
  onForegroundColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onErrorCorrectionLevelChange: (level: 'L' | 'M' | 'Q' | 'H') => void;
  onMarginChange: (margin: number) => void;
}

export function ControlsPanel({
  payload,
  foregroundColor,
  backgroundColor,
  size,
  errorCorrectionLevel,
  margin,
  onPayloadChange,
  onForegroundColorChange,
  onBackgroundColorChange,
  onSizeChange,
  onErrorCorrectionLevelChange,
  onMarginChange,
}: ControlsPanelProps) {
  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Customize QR Code
      </h2>

      {/* Payload Input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Data (URL or Text)
        </label>
        <textarea
          value={payload}
          onChange={(e) => onPayloadChange(e.target.value)}
          placeholder="Enter URL or text..."
          rows={3}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <ColorPicker
          label="Foreground Color"
          value={foregroundColor}
          onChange={onForegroundColorChange}
        />
        <ColorPicker
          label="Background Color"
          value={backgroundColor}
          onChange={onBackgroundColorChange}
        />
      </div>

      {/* Size */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Size: {size}px
        </label>
        <input
          type="range"
          min="128"
          max="1024"
          step="32"
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Margin */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Margin: {margin}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={margin}
          onChange={(e) => onMarginChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Error Correction Level */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Error Correction Level
        </label>
        <select
          value={errorCorrectionLevel}
          onChange={(e) => onErrorCorrectionLevelChange(e.target.value as 'L' | 'M' | 'Q' | 'H')}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="L">Low (~7%)</option>
          <option value="M">Medium (~15%)</option>
          <option value="Q">Quartile (~25%)</option>
          <option value="H">High (~30%)</option>
        </select>
      </div>
    </div>
  );
}
