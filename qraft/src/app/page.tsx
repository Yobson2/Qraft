'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { LogoWithText } from '@/components/Logo';
import { ColorPicker } from '@/features/qr-editor/components/ColorPicker';
import { ShapeSelector } from '@/features/qr-editor/components/ShapeSelector';
import { ImageUploader } from '@/features/qr-editor/components/ImageUploader';
import { GradientPicker } from '@/features/qr-editor/components/GradientPicker';
import { PresetSelector } from '@/features/qr-editor/components/PresetSelector';
import { useAdvancedQREditor } from '@/features/qr-editor/hooks/useAdvancedQREditor';
import { QRPreset } from '@/features/qr-editor/presets/qr-presets';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ChevronDown, Palette, Grid3x3, Image as ImageIcon, Settings } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

const AdvancedQRPreview = dynamic(
  () => import('@/features/qr-editor/components/AdvancedQRPreview').then(mod => ({ default: mod.AdvancedQRPreview })),
  { ssr: false }
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('styles');
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg' | 'jpeg'>('svg');
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    payload,
    foregroundColor,
    backgroundColor,
    foregroundGradient,
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
    payload: 'https://example.com',
  });

  const scrollToTool = () => {
    toolSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation refs
  const trustBadgesRef = useStaggerAnimation<HTMLDivElement>({ animation: 'scaleIn', stagger: 0.1, delay: 0.2 });
  const headlineRef = useScrollAnimation<HTMLHeadingElement>({ animation: 'fadeInUp', delay: 0.3 });
  const subheadlineRef = useScrollAnimation<HTMLParagraphElement>({ animation: 'fadeInUp', delay: 0.5 });
  const socialProofRef = useScrollAnimation<HTMLDivElement>({ animation: 'fadeIn', delay: 0.6 });
  const ctaButtonRef = useScrollAnimation<HTMLDivElement>({ animation: 'scaleInBounce', delay: 0.7 });
  const toolSectionRef = useScrollAnimation<HTMLDivElement>({ animation: 'fadeInUp', start: 'top 90%' });

  // Hero animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('header', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  // QR Preview animation when payload changes
  useEffect(() => {
    if (previewRef.current && payload) {
      gsap.fromTo(
        previewRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [payload]);

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
    setDownloadError(null);

    try {
      const { default: QRCodeStyling } = await import('qr-code-styling');
      const qrCode = new QRCodeStyling(qrOptions);
      const blob = await qrCode.getRawData(format);
      if (blob && blob instanceof Blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `qrcode.${format}`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download error:', error);
      setDownloadError('Failed to download QR code. Please try again.');
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection !== section ? section : null);
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

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <LogoWithText logoSize={28} className="sm:text-base text-sm" />
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-gray-600">100% Free • No Signup</span>
            <Button
              variant="default"
              size="sm"
              className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white"
              onClick={scrollToTool}
            >
              Try It Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 text-center bg-linear-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Trust Badges */}
          <div ref={trustBadgesRef} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm border border-blue-100">
              <span className="text-lg sm:text-xl">✓</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-900">100% Free Forever</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm border border-blue-100">
              <span className="text-lg sm:text-xl">✓</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-900">No Signup Required</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm border border-blue-100">
              <span className="text-lg sm:text-xl">✓</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-900">Unlimited Downloads</span>
            </div>
          </div>

          <h1 ref={headlineRef} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 text-gray-900">
            Create Beautiful QR Codes
            <br />
            <span className="bg-linear-to-r from-blue-600 to-black bg-clip-text text-transparent">
              In Seconds
            </span>
          </h1>
          <p ref={subheadlineRef} className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Professional QR code generator with advanced customization.
            <br className="hidden sm:block" />
            Add gradients, logos, custom shapes, and more - completely free, no watermarks.
          </p>

          {/* Social Proof */}
          <div ref={socialProofRef} className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
            <span className="text-blue-600 font-semibold">🎉 250,000+</span>
            <span>QR codes created by happy users</span>
          </div>

          {/* CTA Button */}
          <div ref={ctaButtonRef}>
            <Button
              size="lg"
              className="bg-linear-to-r from-blue-600 to-black text-white hover:from-blue-700 hover:to-gray-900 text-base sm:text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={scrollToTool}
            >
              Start Creating Free →
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3">No credit card required • Instant access</p>
        </div>
      </section>

      {/* Main Content */}
      <div id="qr-tool" ref={toolSectionRef} className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12 pt-8">
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
        <div ref={previewRef} className="w-full h-full flex items-center justify-center">
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
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownload(downloadFormat)}
                    className="flex-1 h-9 sm:h-10 bg-linear-to-r from-blue-600 to-black text-white hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Download QR Code</span>
                    <span className="sm:hidden">Download</span>
                  </Button>

                  <Select value={downloadFormat} onValueChange={(v) => setDownloadFormat(v as 'png' | 'svg' | 'jpeg')}>
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
                {downloadError && (
                  <p className="text-xs text-center text-red-500">{downloadError}</p>
                )}
                <p className="text-xs text-center text-gray-500">
                  ✓ No watermarks • Free forever • HD quality
                </p>
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
