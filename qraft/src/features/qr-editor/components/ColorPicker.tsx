'use client';

import { ChangeEvent } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={handleChange}
          className="w-12 h-12 rounded-md border border-input cursor-pointer"
        />
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          className="flex-1 font-mono"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
