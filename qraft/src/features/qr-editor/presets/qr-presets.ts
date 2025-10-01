export interface QRPreset {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  config: {
    foregroundColor: string;
    backgroundColor: string;
    foregroundGradient?: {
      enabled: boolean;
      type: 'linear' | 'radial';
      startColor: string;
      endColor: string;
      rotation: number;
    };
    backgroundGradient?: {
      enabled: boolean;
      type: 'linear' | 'radial';
      startColor: string;
      endColor: string;
      rotation: number;
    };
    dotsType: 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
    cornersSquareType: 'square' | 'dot' | 'extra-rounded';
    cornersDotType: 'square' | 'dot';
  };
}

export const QR_PRESETS: QRPreset[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional black and white QR code',
    config: {
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF',
      dotsType: 'square',
      cornersSquareType: 'square',
      cornersDotType: 'square',
    },
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Sleek rounded design',
    config: {
      foregroundColor: '#1F2937',
      backgroundColor: '#F3F4F6',
      dotsType: 'rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
    },
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated classy style',
    config: {
      foregroundColor: '#374151',
      backgroundColor: '#FFFFFF',
      dotsType: 'classy-rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blue gradient',
    config: {
      foregroundColor: '#0EA5E9',
      backgroundColor: '#FFFFFF',
      foregroundGradient: {
        enabled: true,
        type: 'linear',
        startColor: '#0EA5E9',
        endColor: '#0284C7',
        rotation: 45,
      },
      dotsType: 'rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange to pink gradient',
    config: {
      foregroundColor: '#F97316',
      backgroundColor: '#FFFFFF',
      foregroundGradient: {
        enabled: true,
        type: 'linear',
        startColor: '#F97316',
        endColor: '#EC4899',
        rotation: 135,
      },
      dotsType: 'rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural green tones',
    config: {
      foregroundColor: '#059669',
      backgroundColor: '#ECFDF5',
      foregroundGradient: {
        enabled: true,
        type: 'linear',
        startColor: '#059669',
        endColor: '#047857',
        rotation: 90,
      },
      dotsType: 'classy',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
    },
  },
  {
    id: 'royal',
    name: 'Royal',
    description: 'Deep purple elegance',
    config: {
      foregroundColor: '#7C3AED',
      backgroundColor: '#FFFFFF',
      foregroundGradient: {
        enabled: true,
        type: 'radial',
        startColor: '#7C3AED',
        endColor: '#5B21B6',
        rotation: 0,
      },
      dotsType: 'extra-rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Vibrant cyberpunk style',
    config: {
      foregroundColor: '#10B981',
      backgroundColor: '#000000',
      foregroundGradient: {
        enabled: true,
        type: 'linear',
        startColor: '#10B981',
        endColor: '#06B6D4',
        rotation: 45,
      },
      backgroundGradient: {
        enabled: true,
        type: 'radial',
        startColor: '#1F2937',
        endColor: '#000000',
        rotation: 0,
      },
      dotsType: 'dots',
      cornersSquareType: 'dot',
      cornersDotType: 'dot',
    },
  },
];
