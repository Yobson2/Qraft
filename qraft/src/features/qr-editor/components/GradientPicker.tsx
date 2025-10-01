'use client';

import { ColorPicker } from './ColorPicker';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

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
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <button
          onClick={() => onToggle(!enabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {enabled && (
        <>
          <div className="flex gap-2">
            <Button
              onClick={() => onTypeChange('linear')}
              variant={type === 'linear' ? 'default' : 'outline'}
              className="flex-1"
              size="sm"
            >
              Linear
            </Button>
            <Button
              onClick={() => onTypeChange('radial')}
              variant={type === 'radial' ? 'default' : 'outline'}
              className="flex-1"
              size="sm"
            >
              Radial
            </Button>
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
            <div className="space-y-2">
              <Label>Rotation: {rotation}°</Label>
              <Slider
                value={[rotation]}
                onValueChange={([value]) => onRotationChange(value)}
                min={0}
                max={360}
                step={15}
              />
            </div>
          )}

          {/* Gradient Preview */}
          <div
            className="h-12 rounded-md border"
            style={{
              background:
                type === 'linear'
                  ? `linear-gradient(${rotation}deg, ${startColor}, ${endColor})`
                  : `radial-gradient(circle, ${startColor}, ${endColor})`,
            }}
          />
        </>
      )}
    </Card>
  );
}
