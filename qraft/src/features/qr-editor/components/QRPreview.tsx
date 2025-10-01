'use client';

import { useEffect, useRef, useState } from 'react';
import QRCodeLib from 'qrcode';

interface QRPreviewProps {
  payload: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
}

export function QRPreview({
  payload,
  foregroundColor,
  backgroundColor,
  size,
  errorCorrectionLevel,
  margin,
}: QRPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !payload) return;

    const generateQR = async () => {
      try {
        setError(null);
        await QRCodeLib.toCanvas(canvasRef.current, payload, {
          errorCorrectionLevel,
          margin,
          width: size,
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate QR code');
      }
    };

    generateQR();
  }, [payload, foregroundColor, backgroundColor, size, errorCorrectionLevel, margin]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
      {error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            className="border border-gray-200 dark:border-gray-700 rounded shadow-lg"
          />
          {!payload && (
            <p className="mt-4 text-sm text-gray-500">Enter data to generate QR code</p>
          )}
        </>
      )}
    </div>
  );
}
