// Domain Value Object - Color
export class Color {
  private readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(value: string): void {
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/;
    const rgbPattern = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/;
    const rgbaPattern = /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*[0-1]?\.?\d*\s*\)$/;

    if (!hexPattern.test(value) && !rgbPattern.test(value) && !rgbaPattern.test(value)) {
      throw new Error(`Invalid color format: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Color): boolean {
    return this.value === other.value;
  }
}
