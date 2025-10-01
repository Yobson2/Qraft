// Use Case - Update QR Code
import { QRCode } from '../entities/QRCode';
import { QRCodeStyle } from '../entities/QRCodeStyle';
import { QRCodeRepository } from '../repositories/QRCodeRepository';

export interface UpdateQRCodeRequest {
  id: string;
  payload?: string;
  style?: QRCodeStyle;
}

export class UpdateQRCode {
  constructor(private readonly qrCodeRepository: QRCodeRepository) {}

  async execute(request: UpdateQRCodeRequest): Promise<QRCode> {
    const existingQRCode = await this.qrCodeRepository.findById(request.id);

    if (!existingQRCode) {
      throw new Error(`QR Code with id ${request.id} not found`);
    }

    let updatedQRCode = existingQRCode;

    if (request.style) {
      updatedQRCode = updatedQRCode.updateStyle(request.style);
    }

    if (request.payload) {
      updatedQRCode = new QRCode(
        updatedQRCode.id,
        request.payload,
        updatedQRCode.style,
        updatedQRCode.userId,
        updatedQRCode.thumbnailUrl,
        updatedQRCode.createdAt,
        new Date()
      );
    }

    return await this.qrCodeRepository.update(updatedQRCode);
  }
}
