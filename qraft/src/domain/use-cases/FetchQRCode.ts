// Use Case - Fetch QR Code
import { QRCode } from '../entities/QRCode';
import { QRCodeRepository } from '../repositories/QRCodeRepository';

export class FetchQRCode {
  constructor(private readonly qrCodeRepository: QRCodeRepository) {}

  async execute(id: string): Promise<QRCode> {
    const qrCode = await this.qrCodeRepository.findById(id);

    if (!qrCode) {
      throw new Error(`QR Code with id ${id} not found`);
    }

    return qrCode;
  }
}

export class FetchUserQRCodes {
  constructor(private readonly qrCodeRepository: QRCodeRepository) {}

  async execute(userId: string): Promise<QRCode[]> {
    return await this.qrCodeRepository.findByUserId(userId);
  }
}
