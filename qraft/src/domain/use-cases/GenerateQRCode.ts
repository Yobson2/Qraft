// Use Case - Generate QR Code
import { QRCode } from '../entities/QRCode';
import { QRCodeStyle } from '../entities/QRCodeStyle';
import { QRCodeRepository } from '../repositories/QRCodeRepository';
import { v4 as uuidv4 } from 'uuid';

export interface GenerateQRCodeRequest {
  payload: string;
  style: QRCodeStyle;
  userId?: string;
}

export class GenerateQRCode {
  constructor(private readonly qrCodeRepository: QRCodeRepository) {}

  async execute(request: GenerateQRCodeRequest): Promise<QRCode> {
    const qrCode = new QRCode(
      uuidv4(),
      request.payload,
      request.style,
      request.userId
    );

    return await this.qrCodeRepository.save(qrCode);
  }
}
