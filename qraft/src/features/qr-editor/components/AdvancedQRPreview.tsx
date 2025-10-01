'use client';

import { useEffect, useRef, useState } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !isMounted) return;

    // Prepare QR code configuration - exclude image and imageOptions from spreading
    const { image, imageOptions, ...restOptions } = options;

    const config: any = {
      ...restOptions,
    };

    // Only add image and imageOptions if image exists
    if (image && imageOptions) {
      config.image = image;
      config.imageOptions = imageOptions;
    }

    // Create QR code instance
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling(config);
      qrCodeRef.current.append(ref.current);
    } else {
      // Update existing QR code
      qrCodeRef.current.update(config);
    }
  }, [options, isMounted]);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="w-64 h-64 flex items-center justify-center text-gray-400">
          Loading preview...
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div ref={ref} className="qr-code-container" />
    </div>
  );
}
