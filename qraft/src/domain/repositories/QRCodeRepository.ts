// Domain Repository Interface - QR Code
import { QRCode } from '../entities/QRCode';

export interface QRCodeRepository {
  save(qrCode: QRCode): Promise<QRCode>;
  findById(id: string): Promise<QRCode | null>;
  findByUserId(userId: string): Promise<QRCode[]>;
  update(qrCode: QRCode): Promise<QRCode>;
  delete(id: string): Promise<void>;
}
