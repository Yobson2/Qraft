// Use Case - Export QR Code
import { QRCode } from '../entities/QRCode';
import { QRCodeRepository } from '../repositories/QRCodeRepository';

export type ExportFormat = 'svg' | 'png' | 'pdf';

export interface ExportQRCodeRequest {
  id: string;
  format: ExportFormat;
  dpi?: number;
}

export interface ExportQRCodeResponse {
  data: Buffer | string;
  mimeType: string;
  filename: string;
}

export interface QRCodeExporter {
  export(qrCode: QRCode, format: ExportFormat, dpi?: number): Promise<ExportQRCodeResponse>;
}

export class ExportQRCode {
  constructor(
    private readonly qrCodeRepository: QRCodeRepository,
    private readonly exporter: QRCodeExporter
  ) {}

  async execute(request: ExportQRCodeRequest): Promise<ExportQRCodeResponse> {
    const qrCode = await this.qrCodeRepository.findById(request.id);

    if (!qrCode) {
      throw new Error(`QR Code with id ${request.id} not found`);
    }

    return await this.exporter.export(qrCode, request.format, request.dpi);
  }
}
