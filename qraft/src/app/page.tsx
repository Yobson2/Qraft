'use client';

import { useRef } from 'react';
import { LogoWithText } from '@/components/Logo';
import { AdvancedQRPreview } from '@/features/qr-editor/components/AdvancedQRPreview';
import { ColorPicker } from '@/features/qr-editor/components/ColorPicker';
import { ShapeSelector } from '@/features/qr-editor/components/ShapeSelector';
import { ImageUploader } from '@/features/qr-editor/components/ImageUploader';
import { GradientPicker } from '@/features/qr-editor/components/GradientPicker';
import { PresetSelector } from '@/features/qr-editor/components/PresetSelector';
import { AccordionSection } from '@/features/qr-editor/components/AccordionSection';
import { useAdvancedQREditor } from '@/features/qr-editor/hooks/useAdvancedQREditor';
import { QRPreset } from '@/features/qr-editor/presets/qr-presets';
import QRCodeStyling from 'qr-code-styling';

export default function Home() {
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  const {
    payload,
    foregroundColor,
    backgroundColor,
    foregroundGradient,
    backgroundGradient,
    size,
    margin,
    dotsType,
    cornersSquareType,
    cornersDotType,
    logoImage,
    logoSize,
    logoMargin,
    setPayload,
    setForegroundColor,
    setBackgroundColor,
    setForegroundGradient,
    setBackgroundGradient,
    setSize,
    setMargin,
    setDotsType,
    setCornersSquareType,
    setCornersDotType,
    setLogoImage,
    setLogoSize,
    setLogoMargin,
    qrOptions,
  } = useAdvancedQREditor({
    payload: 'https://qraft.app',
  });

  const handlePresetSelect = (preset: QRPreset) => {
    setForegroundColor(preset.config.foregroundColor);
    setBackgroundColor(preset.config.backgroundColor);

    if (preset.config.foregroundGradient) {
      setForegroundGradient(preset.config.foregroundGradient);
    } else {
      setForegroundGradient({ enabled: false });
    }

    if (preset.config.backgroundGradient) {
      setBackgroundGradient(preset.config.backgroundGradient);
    } else {
      setBackgroundGradient({ enabled: false });
    }

    setDotsType(preset.config.dotsType);
    setCornersSquareType(preset.config.cornersSquareType);
    setCornersDotType(preset.config.cornersDotType);
  };

  const handleDownload = async (format: 'png' | 'svg' | 'jpeg') => {
    if (!payload) return;

    try {
      const qrCode = new QRCodeStyling(qrOptions);

      if (format === 'svg') {
        const blob = await qrCode.getRawData('svg');
        if (blob && blob instanceof Blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'qrcode.svg';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      } else {
        const blob = await qrCode.getRawData(format);
        if (blob && blob instanceof Blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `qrcode.${format}`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download QR code');
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <LogoWithText logoSize={36} />
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors hidden md:inline">
                Documentation
              </a>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="py-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Generate your QR Code with ease
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A fast, customizable QR code generator for developers and creators. Change colors, corners, or add a logo in just few clicks.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Column - Preview */}
          <div className="space-y-4">
            {/* URL Input */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Enter your URL or Text *
              </label>
              <input
                type="text"
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Preview */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-lg">
              <AdvancedQRPreview options={qrOptions} />
            </div>

            {/* Download */}
            {payload && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Download QR Code
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownload('svg')}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    SVG
                  </button>
                  <button
                    onClick={() => handleDownload('png')}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                  >
                    PNG
                  </button>
                  <button
                    onClick={() => handleDownload('jpeg')}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                  >
                    JPEG
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-3">
            {/* Quick Styles */}
            <AccordionSection title="Quick Styles" icon="🎨" defaultOpen={true}>
              <PresetSelector onSelectPreset={handlePresetSelect} />
            </AccordionSection>

            {/* Colors */}
            <AccordionSection title="Colors" icon="🎨">
              <div className="space-y-4">
                <ColorPicker
                  label="Foreground Color"
                  value={foregroundColor}
                  onChange={setForegroundColor}
                />
                <ColorPicker
                  label="Background Color"
                  value={backgroundColor}
                  onChange={setBackgroundColor}
                />
              </div>
            </AccordionSection>

            {/* Gradients */}
            <AccordionSection title="Gradients" icon="🌈">
              <div className="space-y-6">
                <GradientPicker
                  label="Foreground Gradient"
                  enabled={foregroundGradient.enabled}
                  type={foregroundGradient.type}
                  startColor={foregroundGradient.startColor}
                  endColor={foregroundGradient.endColor}
                  rotation={foregroundGradient.rotation}
                  onToggle={(enabled) => setForegroundGradient({ enabled })}
                  onTypeChange={(type) => setForegroundGradient({ type })}
                  onStartColorChange={(startColor) => setForegroundGradient({ startColor })}
                  onEndColorChange={(endColor) => setForegroundGradient({ endColor })}
                  onRotationChange={(rotation) => setForegroundGradient({ rotation })}
                />

                <GradientPicker
                  label="Background Gradient"
                  enabled={backgroundGradient.enabled}
                  type={backgroundGradient.type}
                  startColor={backgroundGradient.startColor}
                  endColor={backgroundGradient.endColor}
                  rotation={backgroundGradient.rotation}
                  onToggle={(enabled) => setBackgroundGradient({ enabled })}
                  onTypeChange={(type) => setBackgroundGradient({ type })}
                  onStartColorChange={(startColor) => setBackgroundGradient({ startColor })}
                  onEndColorChange={(endColor) => setBackgroundGradient({ endColor })}
                  onRotationChange={(rotation) => setBackgroundGradient({ rotation })}
                />
              </div>
            </AccordionSection>

            {/* Style & Shape */}
            <AccordionSection title="Style & Shape" icon="⚡">
              <div className="space-y-6">
                <ShapeSelector
                  label="Dot Style"
                  value={dotsType}
                  options={dotsOptions}
                  onChange={(value) => setDotsType(value as any)}
                />

                <ShapeSelector
                  label="Corner Square Style"
                  value={cornersSquareType}
                  options={cornersSquareOptions}
                  onChange={(value) => setCornersSquareType(value as any)}
                />

                <ShapeSelector
                  label="Corner Dot Style"
                  value={cornersDotType}
                  options={cornersDotOptions}
                  onChange={(value) => setCornersDotType(value as any)}
                />
              </div>
            </AccordionSection>

            {/* Logo */}
            <AccordionSection title="Add Logo" icon="🖼️">
              <div className="space-y-4">
                <ImageUploader
                  currentImage={logoImage}
                  onImageUpload={setLogoImage}
                  onImageRemove={() => setLogoImage(undefined)}
                />

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
                        onChange={(e) => setLogoSize(Number(e.target.value))}
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
                        onChange={(e) => setLogoMargin(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </>
                )}
              </div>
            </AccordionSection>

            {/* Advanced Settings */}
            <AccordionSection title="Advanced Settings" icon="⚙️">
              <div className="space-y-4">
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
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

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
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </AccordionSection>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 mt-16 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <LogoWithText logoSize={32} className="justify-center mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 Qraft. Built with ❤️ using Clean Architecture
          </p>
        </div>
      </footer>
    </div>
  );
}
