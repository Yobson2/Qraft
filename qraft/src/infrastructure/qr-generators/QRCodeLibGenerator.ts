// Infrastructure - QRCode library implementation
import QRCodeLib from 'qrcode';
import { QRCode } from '@/domain/entities/QRCode';
import { QRCodeGenerator, QRCodeGeneratorOptions } from './QRCodeGenerator';
import { Color } from '@/domain/value-objects/Color';

export class QRCodeLibGenerator implements QRCodeGenerator {
  async generate(qrCode: QRCode, options?: QRCodeGeneratorOptions): Promise<string | Buffer> {
    const { style, payload } = qrCode;

    // Extract colors
    const foreground = style.foregroundColor instanceof Color
      ? style.foregroundColor.getValue()
      : '#000000';

    const background = style.backgroundColor instanceof Color
      ? style.backgroundColor.getValue()
      : '#FFFFFF';

    const qrOptions = {
      errorCorrectionLevel: style.errorCorrectionLevel.getLevel(),
      margin: style.margin,
      width: style.size.getWidth(),
      color: {
        dark: foreground,
        light: background,
      },
      scale: options?.scale,
    };

    if (options?.format === 'svg') {
      return await QRCodeLib.toString(payload, {
        ...qrOptions,
        type: 'svg',
      });
    }

    if (options?.format === 'dataUrl') {
      return await QRCodeLib.toDataURL(payload, qrOptions);
    }

    // Default to PNG buffer
    return await QRCodeLib.toBuffer(payload, qrOptions);
  }
}
