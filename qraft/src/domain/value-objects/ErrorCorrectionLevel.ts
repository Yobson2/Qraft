// Domain Value Object - Error Correction Level
export enum ErrorCorrectionLevelType {
  LOW = 'L',      // ~7% correction
  MEDIUM = 'M',   // ~15% correction
  QUARTILE = 'Q', // ~25% correction
  HIGH = 'H'      // ~30% correction
}

export class ErrorCorrectionLevel {
  private readonly level: ErrorCorrectionLevelType;

  constructor(level: ErrorCorrectionLevelType) {
    this.level = level;
  }

  getLevel(): ErrorCorrectionLevelType {
    return this.level;
  }

  getCorrectionPercentage(): number {
    const percentages: Record<ErrorCorrectionLevelType, number> = {
      [ErrorCorrectionLevelType.LOW]: 7,
      [ErrorCorrectionLevelType.MEDIUM]: 15,
      [ErrorCorrectionLevelType.QUARTILE]: 25,
      [ErrorCorrectionLevelType.HIGH]: 30,
    };
    return percentages[this.level];
  }

  equals(other: ErrorCorrectionLevel): boolean {
    return this.level === other.level;
  }
}
