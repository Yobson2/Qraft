// Domain Entity - Asset (Logo/Image metadata)
export type AssetType = 'logo' | 'thumbnail' | 'export';

export interface AssetMetadata {
  originalName?: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
}

export class Asset {
  constructor(
    public readonly id: string,
    public readonly qrCodeId: string,
    public readonly url: string,
    public readonly type: AssetType,
    public readonly metadata: AssetMetadata,
    public readonly createdAt: Date = new Date()
  ) {
    this.validateUrl(url);
    this.validateMetadata(metadata);
  }

  private validateUrl(url: string): void {
    if (!url || url.trim().length === 0) {
      throw new Error('Asset URL cannot be empty');
    }
  }

  private validateMetadata(metadata: AssetMetadata): void {
    if (!metadata.mimeType) {
      throw new Error('Asset must have a MIME type');
    }
    if (metadata.size <= 0) {
      throw new Error('Asset size must be positive');
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      qrCodeId: this.qrCodeId,
      url: this.url,
      type: this.type,
      metadata: this.metadata,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
