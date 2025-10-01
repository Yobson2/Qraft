'use client';

import { useState, useCallback, useMemo } from 'react';
import { QRStyleOptions } from '../components/AdvancedQRPreview';

interface GradientConfig {
  enabled: boolean;
  type: 'linear' | 'radial';
  startColor: string;
  endColor: string;
  rotation: number;
}

interface AdvancedQREditorState {
  payload: string;
  foregroundColor: string;
  backgroundColor: string;
  foregroundGradient: GradientConfig;
  backgroundGradient: GradientConfig;
  size: number;
  margin: number;
  dotsType: 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
  cornersSquareType: 'square' | 'dot' | 'extra-rounded';
  cornersDotType: 'square' | 'dot';
  logoImage?: string;
  logoSize: number;
  logoMargin: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

const DEFAULT_STATE: AdvancedQREditorState = {
  payload: '',
  foregroundColor: '#000000',
  backgroundColor: '#FFFFFF',
  foregroundGradient: {
    enabled: false,
    type: 'linear',
    startColor: '#000000',
    endColor: '#4F46E5',
    rotation: 0,
  },
  backgroundGradient: {
    enabled: false,
    type: 'linear',
    startColor: '#FFFFFF',
    endColor: '#E0E7FF',
    rotation: 0,
  },
  size: 300,
  margin: 10,
  dotsType: 'rounded',
  cornersSquareType: 'extra-rounded',
  cornersDotType: 'dot',
  logoSize: 0.3,
  logoMargin: 5,
  errorCorrectionLevel: 'M',
};

export function useAdvancedQREditor(initialState?: Partial<AdvancedQREditorState>) {
  const [state, setState] = useState<AdvancedQREditorState>({
    ...DEFAULT_STATE,
    ...initialState,
  });

  const setPayload = useCallback((payload: string) => {
    setState((prev) => ({ ...prev, payload }));
  }, []);

  const setForegroundColor = useCallback((foregroundColor: string) => {
    setState((prev) => ({ ...prev, foregroundColor }));
  }, []);

  const setBackgroundColor = useCallback((backgroundColor: string) => {
    setState((prev) => ({ ...prev, backgroundColor }));
  }, []);

  const setForegroundGradient = useCallback((gradient: Partial<GradientConfig>) => {
    setState((prev) => ({
      ...prev,
      foregroundGradient: { ...prev.foregroundGradient, ...gradient },
    }));
  }, []);

  const setBackgroundGradient = useCallback((gradient: Partial<GradientConfig>) => {
    setState((prev) => ({
      ...prev,
      backgroundGradient: { ...prev.backgroundGradient, ...gradient },
    }));
  }, []);

  const setSize = useCallback((size: number) => {
    setState((prev) => ({ ...prev, size }));
  }, []);

  const setMargin = useCallback((margin: number) => {
    setState((prev) => ({ ...prev, margin }));
  }, []);

  const setDotsType = useCallback((dotsType: AdvancedQREditorState['dotsType']) => {
    setState((prev) => ({ ...prev, dotsType }));
  }, []);

  const setCornersSquareType = useCallback((cornersSquareType: AdvancedQREditorState['cornersSquareType']) => {
    setState((prev) => ({ ...prev, cornersSquareType }));
  }, []);

  const setCornersDotType = useCallback((cornersDotType: AdvancedQREditorState['cornersDotType']) => {
    setState((prev) => ({ ...prev, cornersDotType }));
  }, []);

  const setLogoImage = useCallback((logoImage: string | undefined) => {
    setState((prev) => ({ ...prev, logoImage }));
  }, []);

  const setLogoSize = useCallback((logoSize: number) => {
    setState((prev) => ({ ...prev, logoSize }));
  }, []);

  const setLogoMargin = useCallback((logoMargin: number) => {
    setState((prev) => ({ ...prev, logoMargin }));
  }, []);

  const setErrorCorrectionLevel = useCallback((errorCorrectionLevel: AdvancedQREditorState['errorCorrectionLevel']) => {
    setState((prev) => ({ ...prev, errorCorrectionLevel }));
  }, []);

  const qrOptions = useMemo((): QRStyleOptions => {
    const { foregroundGradient, backgroundGradient } = state;

    return {
      data: state.payload,
      width: state.size,
      height: state.size,
      margin: state.margin,
      qrOptions: {
        errorCorrectionLevel: state.errorCorrectionLevel,
      },
      dotsOptions: {
        color: foregroundGradient.enabled
          ? ''
          : state.foregroundColor,
        type: state.dotsType,
        ...(foregroundGradient.enabled && {
          gradient: {
            type: foregroundGradient.type,
            rotation: foregroundGradient.rotation / 180 * Math.PI,
            colorStops: [
              { offset: 0, color: foregroundGradient.startColor },
              { offset: 1, color: foregroundGradient.endColor },
            ],
          },
        }),
      },
      backgroundOptions: {
        color: backgroundGradient.enabled
          ? ''
          : state.backgroundColor,
        ...(backgroundGradient.enabled && {
          gradient: {
            type: backgroundGradient.type,
            rotation: backgroundGradient.rotation / 180 * Math.PI,
            colorStops: [
              { offset: 0, color: backgroundGradient.startColor },
              { offset: 1, color: backgroundGradient.endColor },
            ],
          },
        }),
      },
      cornersSquareOptions: {
        color: foregroundGradient.enabled
          ? foregroundGradient.startColor
          : state.foregroundColor,
        type: state.cornersSquareType,
      },
      cornersDotOptions: {
        color: foregroundGradient.enabled
          ? foregroundGradient.startColor
          : state.foregroundColor,
        type: state.cornersDotType,
      },
      ...(state.logoImage && {
        image: state.logoImage,
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: state.logoSize,
          margin: state.logoMargin,
          crossOrigin: 'anonymous',
        },
      }),
    };
  }, [state]);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  return {
    ...state,
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
    reset,
  };
}
