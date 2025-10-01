'use client';

import { ColorPicker } from './ColorPicker';
import { ShapeSelector } from './ShapeSelector';
import { ImageUploader } from './ImageUploader';

interface AdvancedControlsPanelProps {
  payload: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  margin: number;
  dotsType: string;
  cornersSquareType: string;
  cornersDotType: string;
  logoImage?: string;
  logoSize: number;
  logoMargin: number;
  onPayloadChange: (payload: string) => void;
  onForegroundColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onMarginChange: (margin: number) => void;
  onDotsTypeChange: (type: string) => void;
  onCornersSquareTypeChange: (type: string) => void;
  onCornersDotTypeChange: (type: string) => void;
  onLogoImageChange: (dataUrl: string) => void;
  onLogoRemove: () => void;
  onLogoSizeChange: (size: number) => void;
  onLogoMarginChange: (margin: number) => void;
}

export function AdvancedControlsPanel({
  payload,
  foregroundColor,
  backgroundColor,
  size,
  margin,
  dotsType,
  cornersSquareType,
  cornersDotType,
  logoImage,
  logoSize,
  logoMargin,
  onPayloadChange,
  onForegroundColorChange,
  onBackgroundColorChange,
  onSizeChange,
  onMarginChange,
  onDotsTypeChange,
  onCornersSquareTypeChange,
  onCornersDotTypeChange,
  onLogoImageChange,
  onLogoRemove,
  onLogoSizeChange,
  onLogoMarginChange,
}: AdvancedControlsPanelProps) {
  const dotsOptions = [
    { value: 'square', label: 'Square' },
    { value: 'dots', label: 'Dots' },
    { value: 'rounded', label: 'Rounded' },
    { value: 'extra-rounded', label: 'Extra Round' },
    { value: 'classy', label: 'Classy' },
    { value: 'classy-rounded', label: 'Classy Round' },
  ];

  const cornersSquareOptions = [
    { value: 'square', label: 'Square' },
    { value: 'dot', label: 'Dot' },
    { value: 'extra-rounded', label: 'Rounded' },
  ];

  const cornersDotOptions = [
    { value: 'square', label: 'Square' },
    { value: 'dot', label: 'Dot' },
  ];

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sticky top-0 bg-white dark:bg-gray-800 py-2 z-10">
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
          max="20"
          step="1"
          value={margin}
          onChange={(e) => onMarginChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Dot Style */}
      <ShapeSelector
        label="Dot Style"
        value={dotsType}
        options={dotsOptions}
        onChange={onDotsTypeChange}
      />

      {/* Corner Square Style */}
      <ShapeSelector
        label="Corner Square Style"
        value={cornersSquareType}
        options={cornersSquareOptions}
        onChange={onCornersSquareTypeChange}
      />

      {/* Corner Dot Style */}
      <ShapeSelector
        label="Corner Dot Style"
        value={cornersDotType}
        options={cornersDotOptions}
        onChange={onCornersDotTypeChange}
      />

      {/* Logo/Image Upload */}
      <ImageUploader
        currentImage={logoImage}
        onImageUpload={onLogoImageChange}
        onImageRemove={onLogoRemove}
      />

      {/* Logo Size */}
      {logoImage && (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Logo Size: {logoSize.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="0.5"
              step="0.05"
              value={logoSize}
              onChange={(e) => onLogoSizeChange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Logo Margin: {logoMargin}
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={logoMargin}
              onChange={(e) => onLogoMarginChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      )}
    </div>
  );
}
