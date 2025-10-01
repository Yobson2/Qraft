'use client';

import { useState } from 'react';
import { ColorPicker } from './ColorPicker';

interface GradientPickerProps {
  label: string;
  enabled: boolean;
  type: 'linear' | 'radial';
  startColor: string;
  endColor: string;
  rotation: number;
  onToggle: (enabled: boolean) => void;
  onTypeChange: (type: 'linear' | 'radial') => void;
  onStartColorChange: (color: string) => void;
  onEndColorChange: (color: string) => void;
  onRotationChange: (rotation: number) => void;
}

export function GradientPicker({
  label,
  enabled,
  type,
  startColor,
  endColor,
  rotation,
  onToggle,
  onTypeChange,
  onStartColorChange,
  onEndColorChange,
  onRotationChange,
}: GradientPickerProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <button
          onClick={() => onToggle(!enabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {enabled && (
        <>
          <div className="flex gap-2">
            <button
              onClick={() => onTypeChange('linear')}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                type === 'linear'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Linear
            </button>
            <button
              onClick={() => onTypeChange('radial')}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                type === 'radial'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Radial
            </button>
          </div>

          <ColorPicker
            label="Start Color"
            value={startColor}
            onChange={onStartColorChange}
          />

          <ColorPicker
            label="End Color"
            value={endColor}
            onChange={onEndColorChange}
          />

          {type === 'linear' && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Rotation: {rotation}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={rotation}
                onChange={(e) => onRotationChange(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* Gradient Preview */}
          <div
            className="h-12 rounded border border-gray-300 dark:border-gray-600"
            style={{
              background:
                type === 'linear'
                  ? `linear-gradient(${rotation}deg, ${startColor}, ${endColor})`
                  : `radial-gradient(circle, ${startColor}, ${endColor})`,
            }}
          />
        </>
      )}
    </div>
  );
}
