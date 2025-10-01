// Domain Entity - QR Code
import { QRCodeStyle } from './QRCodeStyle';

export class QRCode {
  constructor(
    public readonly id: string,
    public readonly payload: string,
    public readonly style: QRCodeStyle,
    public readonly userId?: string,
    public readonly thumbnailUrl?: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {
    this.validatePayload(payload);
  }

  private validatePayload(payload: string): void {
    if (!payload || payload.trim().length === 0) {
      throw new Error('QR Code payload cannot be empty');
    }
    if (payload.length > 4296) {
      throw new Error('QR Code payload exceeds maximum length of 4296 characters');
    }
  }

  updateStyle(newStyle: QRCodeStyle): QRCode {
    return new QRCode(
      this.id,
      this.payload,
      newStyle,
      this.userId,
      this.thumbnailUrl,
      this.createdAt,
      new Date()
    );
  }

  updateThumbnail(thumbnailUrl: string): QRCode {
    return new QRCode(
      this.id,
      this.payload,
      this.style,
      this.userId,
      thumbnailUrl,
      this.createdAt,
      new Date()
    );
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      payload: this.payload,
      style: this.style.toJSON(),
      userId: this.userId,
      thumbnailUrl: this.thumbnailUrl,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
