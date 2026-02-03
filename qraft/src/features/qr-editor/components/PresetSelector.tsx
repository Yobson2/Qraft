'use client';

import { useHoverAnimation } from '@/hooks/useScrollAnimation';
import { QR_PRESETS, QRPreset } from '../presets/qr-presets';

interface PresetSelectorProps {
  onSelectPreset: (preset: QRPreset) => void;
}

function PresetButton({ preset, onSelect }: { preset: QRPreset; onSelect: () => void }) {
  const ref = useHoverAnimation({ scale: 1.05, y: -3, duration: 0.2 });

  return (
    <button
      ref={ref}
      onClick={onSelect}
      className="flex-shrink-0 flex flex-col items-center gap-1.5 p-2 min-w-[80px] border border-border rounded-md hover:border-primary hover:bg-accent transition-colors group"
    >
          {/* Preview Circle */}
          <div
            className="w-10 h-10 rounded-full border border-border group-hover:border-primary transition-colors"
            style={{
              background: preset.config.foregroundGradient?.enabled
                ? preset.config.foregroundGradient.type === 'linear'
                  ? `linear-gradient(${preset.config.foregroundGradient.rotation}deg, ${preset.config.foregroundGradient.startColor}, ${preset.config.foregroundGradient.endColor})`
                  : `radial-gradient(circle, ${preset.config.foregroundGradient.startColor}, ${preset.config.foregroundGradient.endColor})`
                : preset.config.foregroundColor,
            }}
          />
          <div className="text-center">
            <p className="text-[10px] font-medium leading-tight">
              {preset.name}
            </p>
          </div>
    </button>
  );
}

export function PresetSelector({ onSelectPreset }: PresetSelectorProps) {
  return (
    <div className="flex overflow-x-auto gap-2 -mx-1 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {QR_PRESETS.map((preset) => (
        <PresetButton
          key={preset.id}
          preset={preset}
          onSelect={() => onSelectPreset(preset)}
        />
      ))}
    </div>
  );
}
