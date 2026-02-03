'use client';

import { useState } from 'react';
import { LogoWithText } from '@/components/Logo';
import { AdvancedQRPreview } from '@/features/qr-editor/components/AdvancedQRPreview';
import { ColorPicker } from '@/features/qr-editor/components/ColorPicker';
import { ShapeSelector } from '@/features/qr-editor/components/ShapeSelector';
import { ImageUploader } from '@/features/qr-editor/components/ImageUploader';
import { GradientPicker } from '@/features/qr-editor/components/GradientPicker';
import { PresetSelector } from '@/features/qr-editor/components/PresetSelector';
import { useAdvancedQREditor } from '@/features/qr-editor/hooks/useAdvancedQREditor';
import { QRPreset } from '@/features/qr-editor/presets/qr-presets';
import QRCodeStyling from 'qr-code-styling';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ChevronDown, Palette, Grid3x3, Image as ImageIcon, Settings } from 'lucide-react';

export default function Home() {
  const [expandedSection, setExpandedSection] = useState<string | null>('styles');

  const {
    payload,
    foregroundColor,
    backgroundColor,
    foregroundGradient,
    backgroundGradient: _backgroundGradient,
    size,
    margin,
    dotsType,
    cornersSquareType,
    cornersDotType,
    logoImage,
    logoSize,
    logoMargin,
    errorCorrectionLevel,
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
    setErrorCorrectionLevel,
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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
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

  const errorCorrectionOptions = [
    { value: 'L', label: 'Low (7%)' },
    { value: 'M', label: 'Medium (15%)' },
    { value: 'Q', label: 'Quartile (25%)' },
    { value: 'H', label: 'High (30%)' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <LogoWithText logoSize={28} className="sm:text-base text-sm" />
          <Button
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Create QR
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-6 sm:py-8 md:py-10 text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-gray-900">
            Generate your QR Code
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>with ease
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            A fast, customizable QR code generator for developers and creators.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Change colors, corners, or add a logo in just few clicks.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-7xl lg:max-w-2xl mx-auto">

          {/* Left Column - Inputs & Preview */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* URL Input */}
            <Card className="bg-white border-gray-200">
              <CardContent className=" space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-600">Enter your URL *</Label>
                  <Input
                    type="text"
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                    placeholder="https://example.com"
                    className="bg-gray-50 border-gray-300 h-10 text-sm text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-600">Name your QR Code</Label>
                  <Input
                    type="text"
                    placeholder="QR Code Name"
                    className="bg-gray-50 border-gray-300 h-10 text-sm text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* QR Preview */}
            <Card className="bg-white border-gray-200 shadow-sm">
  <CardContent className="p-4">
    <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center min-h-[200px] max-h-[300px] overflow-hidden">
      {payload ? (
        <div className="w-full h-full flex items-center justify-center">
          <AdvancedQRPreview options={qrOptions} />
        </div>
      ) : (
        <p className="text-gray-500 text-sm text-center">Please enter a valid URL</p>
      )}
    </div>
  </CardContent>
</Card>



            {/* Download Button */}
            {payload && (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDownload('svg')}
                  className="flex-1 h-9 sm:h-10 bg-gradient-to-r from-blue-600 to-black text-white hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Download QR Code</span>
                  <span className="sm:hidden">Download</span>
                </Button>

                <Select defaultValue="svg">
                  <SelectTrigger className="w-16 sm:w-20 h-9 sm:h-10 bg-gray-50 border border-gray-300 text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="svg">SVG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Right Column - Collapsible Options */}
          <div className="space-y-2 mt-6 lg:mt-0">

            {/* Quick Styles */}
            <Card className="bg-white border-gray-200 overflow-hidden p-0">
              <button
                onClick={() => toggleSection('styles')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gray-600" />
                  <div className="text-left">
                    <p className="text-xs font-medium text-gray-900">Quick Styles</p>
                    <p className="text-xs text-gray-500">Choose a preset design</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${expandedSection === 'styles' ? 'rotate-180' : ''}`} />
              </button>
              {expandedSection === 'styles' && (
                <CardContent className="px-4 pb-4">
                  <PresetSelector onSelectPreset={handlePresetSelect} />
                </CardContent>
              )}
            </Card>

            {/* Colors */}
            <Card className="bg-white border-gray-200 overflow-hidden p-0">
              <button
                onClick={() => toggleSection('colors')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gray-600" />
                  <div className="text-left">
                    <p className="text-xs font-medium text-gray-900">Colors & Gradients</p>
                    <p className="text-xs text-gray-500">Customize QR code colors</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${expandedSection === 'colors' ? 'rotate-180' : ''}`} />
              </button>
              {expandedSection === 'colors' && (
                <CardContent className="px-4 pb-4 space-y-4">
                  <ColorPicker
                    label="Foreground"
                    value={foregroundColor}
                    onChange={setForegroundColor}
                  />
                  <ColorPicker
                    label="Background"
                    value={backgroundColor}
                    onChange={setBackgroundColor}
                  />

                  <div className="pt-4 space-y-4">
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
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Shapes */}
            <Card className="bg-white border-gray-200 overflow-hidden p-0">
              <button
                onClick={() => toggleSection('shapes')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Grid3x3 className="w-4 h-4 text-gray-600" />
                  <div className="text-left">
                    <p className="text-xs font-medium text-gray-900">QR Code Pattern</p>
                    <p className="text-xs text-gray-500">Define the QR code pattern</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${expandedSection === 'shapes' ? 'rotate-180' : ''}`} />
              </button>
              {expandedSection === 'shapes' && (
                <CardContent className="px-4 pb-4 space-y-4">
                  <ShapeSelector
                    label="Dot Style"
                    value={dotsType}
                    options={dotsOptions}
                    onChange={(value) => setDotsType(value as typeof dotsType)}
                  />
                  <ShapeSelector
                    label="Corner Squares"
                    value={cornersSquareType}
                    options={cornersSquareOptions}
                    onChange={(value) => setCornersSquareType(value as typeof cornersSquareType)}
                  />
                  <ShapeSelector
                    label="Corner Dots"
                    value={cornersDotType}
                    options={cornersDotOptions}
                    onChange={(value) => setCornersDotType(value as typeof cornersDotType)}
                  />
                </CardContent>
              )}
            </Card>

            {/* Logo */}
            <Card className="bg-white border-gray-200 overflow-hidden p-0">
              <button
                onClick={() => toggleSection('logo')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-gray-600" />
                  <div className="text-left">
                    <p className="text-xs font-medium text-gray-900">Add Logo</p>
                    <p className="text-xs text-gray-500">Add a logo to your QR code</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${expandedSection === 'logo' ? 'rotate-180' : ''}`} />
              </button>
              {expandedSection === 'logo' && (
                <CardContent className="px-4 pb-4 space-y-4">
                  <ImageUploader
                    currentImage={logoImage}
                    onImageUpload={setLogoImage}
                    onImageRemove={() => setLogoImage(undefined)}
                  />
                  {logoImage && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm">Size: {logoSize.toFixed(2)}</Label>
                        <Slider
                          value={[logoSize]}
                          onValueChange={([value]) => setLogoSize(value)}
                          min={0.1}
                          max={0.5}
                          step={0.05}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Margin: {logoMargin}px</Label>
                        <Slider
                          value={[logoMargin]}
                          onValueChange={([value]) => setLogoMargin(value)}
                          min={0}
                          max={20}
                          step={1}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              )}
            </Card>

            {/* Advanced Settings */}
            <Card className="bg-white border-gray-200 overflow-hidden p-0">
              <button
                onClick={() => toggleSection('advanced')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-gray-600" />
                  <div className="text-left">
                    <p className="text-xs font-medium text-gray-900">Advanced Settings</p>
                    <p className="text-xs text-gray-500">Fine-tune your QR code</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${expandedSection === 'advanced' ? 'rotate-180' : ''}`} />
              </button>
              {expandedSection === 'advanced' && (
                <CardContent className="px-4 pb-4 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Error Correction</Label>
                    <Select
                      value={errorCorrectionLevel}
                      onValueChange={(value) => setErrorCorrectionLevel(value as typeof errorCorrectionLevel)}
                    >
                      <SelectTrigger className="bg-gray-50 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {errorCorrectionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Size: {size}px</Label>
                    <Slider
                      value={[size]}
                      onValueChange={([value]) => setSize(value)}
                      min={128}
                      max={1024}
                      step={32}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Margin: {margin}px</Label>
                    <Slider
                      value={[margin]}
                      onValueChange={([value]) => setMargin(value)}
                      min={0}
                      max={20}
                      step={1}
                    />
                  </div>
                </CardContent>
              )}
            </Card>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          © 2026 Qraft. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
