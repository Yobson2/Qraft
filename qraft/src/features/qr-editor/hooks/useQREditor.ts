'use client';

import { useState, useCallback } from 'react';

interface QREditorState {
  payload: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
}

const DEFAULT_STATE: QREditorState = {
  payload: '',
  foregroundColor: '#000000',
  backgroundColor: '#FFFFFF',
  size: 256,
  errorCorrectionLevel: 'M',
  margin: 4,
};

export function useQREditor(initialState?: Partial<QREditorState>) {
  const [state, setState] = useState<QREditorState>({
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

  const setSize = useCallback((size: number) => {
    setState((prev) => ({ ...prev, size }));
  }, []);

  const setErrorCorrectionLevel = useCallback((errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H') => {
    setState((prev) => ({ ...prev, errorCorrectionLevel }));
  }, []);

  const setMargin = useCallback((margin: number) => {
    setState((prev) => ({ ...prev, margin }));
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  return {
    ...state,
    setPayload,
    setForegroundColor,
    setBackgroundColor,
    setSize,
    setErrorCorrectionLevel,
    setMargin,
    reset,
  };
}
