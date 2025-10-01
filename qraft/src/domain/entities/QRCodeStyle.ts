// Domain Entity - QR Code Style Configuration
import { Color } from '../value-objects/Color';
import { Size } from '../value-objects/Size';
import { ErrorCorrectionLevel } from '../value-objects/ErrorCorrectionLevel';

export interface GradientConfig {
  type: 'linear' | 'radial';
  colorStops: Array<{ offset: number; color: Color }>;
  rotation?: number;
}

export interface LogoConfig {
  url: string;
  size: number; // percentage of QR code size
  margin: number;
  shape: 'circle' | 'rounded' | 'square';
  backgroundColor?: Color;
}

export interface ShapeConfig {
  dotsType: 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
  cornersSquareType: 'square' | 'dot' | 'extra-rounded';
  cornersDotType: 'square' | 'dot';
}

export class QRCodeStyle {
  constructor(
    public readonly foregroundColor: Color | GradientConfig,
    public readonly backgroundColor: Color | GradientConfig,
    public readonly errorCorrectionLevel: ErrorCorrectionLevel,
    public readonly size: Size,
    public readonly margin: number = 4,
    public readonly logo?: LogoConfig,
    public readonly shape?: ShapeConfig,
    public readonly quietZone: number = 4
  ) {
    this.validateMargin(margin);
    this.validateQuietZone(quietZone);
  }

  private validateMargin(margin: number): void {
    if (margin < 0 || margin > 100) {
      throw new Error('Margin must be between 0 and 100');
    }
  }

  private validateQuietZone(quietZone: number): void {
    if (quietZone < 0 || quietZone > 50) {
      throw new Error('Quiet zone must be between 0 and 50');
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      foregroundColor: this.foregroundColor instanceof Color ? this.foregroundColor.getValue() : this.foregroundColor,
      backgroundColor: this.backgroundColor instanceof Color ? this.backgroundColor.getValue() : this.backgroundColor,
      errorCorrectionLevel: this.errorCorrectionLevel.getLevel(),
      size: { width: this.size.getWidth(), height: this.size.getHeight() },
      margin: this.margin,
      logo: this.logo,
      shape: this.shape,
      quietZone: this.quietZone,
    };
  }
}
