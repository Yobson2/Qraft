'use client';

import { QR_PRESETS, QRPreset } from '../presets/qr-presets';

interface PresetSelectorProps {
  onSelectPreset: (preset: QRPreset) => void;
}

export function PresetSelector({ onSelectPreset }: PresetSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Quick Presets
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QR_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className="flex flex-col items-center gap-2 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
          >
            {/* Preview Circle */}
            <div
              className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-blue-500 transition-colors"
              style={{
                background: preset.config.foregroundGradient?.enabled
                  ? preset.config.foregroundGradient.type === 'linear'
                    ? `linear-gradient(${preset.config.foregroundGradient.rotation}deg, ${preset.config.foregroundGradient.startColor}, ${preset.config.foregroundGradient.endColor})`
                    : `radial-gradient(circle, ${preset.config.foregroundGradient.startColor}, ${preset.config.foregroundGradient.endColor})`
                  : preset.config.foregroundColor,
              }}
            />
            <div className="text-center">
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                {preset.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {preset.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
