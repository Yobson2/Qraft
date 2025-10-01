// Use Case - Delete QR Code
import { QRCodeRepository } from '../repositories/QRCodeRepository';
import { AssetRepository } from '../repositories/AssetRepository';

export class DeleteQRCode {
  constructor(
    private readonly qrCodeRepository: QRCodeRepository,
    private readonly assetRepository: AssetRepository
  ) {}

  async execute(id: string): Promise<void> {
    const qrCode = await this.qrCodeRepository.findById(id);

    if (!qrCode) {
      throw new Error(`QR Code with id ${id} not found`);
    }

    // Delete associated assets first
    await this.assetRepository.deleteByQRCodeId(id);

    // Delete the QR code
    await this.qrCodeRepository.delete(id);
  }
}
