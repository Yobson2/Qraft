// Infrastructure - In-Memory Asset Repository (for development)
import { Asset } from '@/domain/entities/Asset';
import { AssetRepository } from '@/domain/repositories/AssetRepository';

export class InMemoryAssetRepository implements AssetRepository {
  private assets: Map<string, Asset> = new Map();

  async save(asset: Asset): Promise<Asset> {
    this.assets.set(asset.id, asset);
    return asset;
  }

  async findById(id: string): Promise<Asset | null> {
    return this.assets.get(id) || null;
  }

  async findByQRCodeId(qrCodeId: string): Promise<Asset[]> {
    return Array.from(this.assets.values()).filter(
      (asset) => asset.qrCodeId === qrCodeId
    );
  }

  async delete(id: string): Promise<void> {
    this.assets.delete(id);
  }

  async deleteByQRCodeId(qrCodeId: string): Promise<void> {
    const assetsToDelete = await this.findByQRCodeId(qrCodeId);
    assetsToDelete.forEach((asset) => this.assets.delete(asset.id));
  }

  // Helper method for testing
  clear(): void {
    this.assets.clear();
  }
}
