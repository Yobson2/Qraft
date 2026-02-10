'use client';

import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

export interface QRStyleOptions {
  data: string;
  width: number;
  height: number;
  margin: number;
  qrOptions?: {
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  };
  dotsOptions: {
    color: string;
    type: 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
  };
  backgroundOptions: {
    color: string;
  };
  cornersSquareOptions?: {
    color: string;
    type: 'square' | 'dot' | 'extra-rounded';
  };
  cornersDotOptions?: {
    color: string;
    type: 'square' | 'dot';
  };
  imageOptions?: {
    hideBackgroundDots: boolean;
    imageSize: number;
    margin: number;
    crossOrigin: string;
  };
  image?: string;
}

interface AdvancedQRPreviewProps {
  options: QRStyleOptions;
}

export function AdvancedQRPreview({ options }: AdvancedQRPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { image, imageOptions, ...restOptions } = options;

    const config: Record<string, unknown> = {
      ...restOptions,
    };

    if (image && imageOptions) {
      config.image = image;
      config.imageOptions = imageOptions;
    }

    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling(config);
      qrCodeRef.current.append(containerRef.current);
    } else {
      qrCodeRef.current.update(config);
    }
  }, [options]);

  return (
    <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div ref={containerRef} className="qr-code-container" />
    </div>
  );
}
