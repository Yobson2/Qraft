// Domain Value Object - Size
export class Size {
  private readonly width: number;
  private readonly height: number;

  constructor(width: number, height: number) {
    this.validate(width, height);
    this.width = width;
    this.height = height;
  }

  private validate(width: number, height: number): void {
    if (width <= 0 || height <= 0) {
      throw new Error('Size dimensions must be positive numbers');
    }
    if (width > 10000 || height > 10000) {
      throw new Error('Size dimensions cannot exceed 10000 pixels');
    }
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  equals(other: Size): boolean {
    return this.width === other.width && this.height === other.height;
  }
}
