// Infrastructure - In-Memory QR Code Repository (for development)
import { QRCode } from '@/domain/entities/QRCode';
import { QRCodeRepository } from '@/domain/repositories/QRCodeRepository';

export class InMemoryQRCodeRepository implements QRCodeRepository {
  private qrCodes: Map<string, QRCode> = new Map();

  async save(qrCode: QRCode): Promise<QRCode> {
    this.qrCodes.set(qrCode.id, qrCode);
    return qrCode;
  }

  async findById(id: string): Promise<QRCode | null> {
    return this.qrCodes.get(id) || null;
  }

  async findByUserId(userId: string): Promise<QRCode[]> {
    return Array.from(this.qrCodes.values()).filter(
      (qrCode) => qrCode.userId === userId
    );
  }

  async update(qrCode: QRCode): Promise<QRCode> {
    if (!this.qrCodes.has(qrCode.id)) {
      throw new Error(`QR Code with id ${qrCode.id} not found`);
    }
    this.qrCodes.set(qrCode.id, qrCode);
    return qrCode;
  }

  async delete(id: string): Promise<void> {
    this.qrCodes.delete(id);
  }

  // Helper method for testing
  clear(): void {
    this.qrCodes.clear();
  }
}
