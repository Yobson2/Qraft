// Domain Repository Interface - Asset
import { Asset } from '../entities/Asset';

export interface AssetRepository {
  save(asset: Asset): Promise<Asset>;
  findById(id: string): Promise<Asset | null>;
  findByQRCodeId(qrCodeId: string): Promise<Asset[]>;
  delete(id: string): Promise<void>;
  deleteByQRCodeId(qrCodeId: string): Promise<void>;
}
