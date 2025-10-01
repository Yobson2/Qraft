// Infrastructure - QR Code Generator Interface
import { QRCode } from '@/domain/entities/QRCode';
import { ExportFormat, ExportQRCodeResponse, QRCodeExporter } from '@/domain/use-cases/ExportQRCode';

export interface QRCodeGeneratorOptions {
  format?: 'svg' | 'png' | 'dataUrl';
  scale?: number;
  margin?: number;
}

export interface QRCodeGenerator {
  generate(qrCode: QRCode, options?: QRCodeGeneratorOptions): Promise<string | Buffer>;
}

export class QRCodeExporterImpl implements QRCodeExporter {
  constructor(private readonly generator: QRCodeGenerator) {}

  async export(qrCode: QRCode, format: ExportFormat, dpi: number = 300): Promise<ExportQRCodeResponse> {
    const scale = format === 'png' ? Math.ceil(dpi / 72) : 1;

    let data: string | Buffer;
    let mimeType: string;

    switch (format) {
      case 'svg':
        data = await this.generator.generate(qrCode, { format: 'svg' });
        mimeType = 'image/svg+xml';
        break;
      case 'png':
        data = await this.generator.generate(qrCode, { format: 'png', scale });
        mimeType = 'image/png';
        break;
      case 'pdf':
        // PDF generation will be implemented later
        throw new Error('PDF export not yet implemented');
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }

    const filename = `qrcode-${qrCode.id}.${format}`;

    return {
      data,
      mimeType,
      filename,
    };
  }
}
