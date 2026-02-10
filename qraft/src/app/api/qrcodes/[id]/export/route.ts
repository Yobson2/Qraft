import { NextRequest, NextResponse } from 'next/server';
import { ExportQRCode, ExportFormat } from '@/domain/use-cases/ExportQRCode';
import { qrCodeRepository } from '@/infrastructure/repositories';
import { QRCodeLibGenerator } from '@/infrastructure/qr-generators/QRCodeLibGenerator';
import { QRCodeExporterImpl } from '@/infrastructure/qr-generators/QRCodeGenerator';

const qrGenerator = new QRCodeLibGenerator();
const qrExporter = new QRCodeExporterImpl(qrGenerator);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const format = (searchParams.get('format') || 'png') as ExportFormat;
    const dpi = parseInt(searchParams.get('dpi') || '300');

    // Validate format
    if (!['svg', 'png', 'pdf'].includes(format)) {
      return NextResponse.json(
        { error: 'Invalid format. Must be svg, png, or pdf' },
        { status: 400 }
      );
    }

    const exportQRCode = new ExportQRCode(qrCodeRepository, qrExporter);
    const result = await exportQRCode.execute({ id, format, dpi });

    // Return the file
    const responseBody = Buffer.isBuffer(result.data)
      ? new Uint8Array(result.data)
      : result.data;

    return new NextResponse(responseBody, {
      headers: {
        'Content-Type': result.mimeType,
        'Content-Disposition': `attachment; filename="${result.filename}"`,
      },
    });
  } catch (error) {
    console.error('Error exporting QR code:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to export QR code' },
      { status: 500 }
    );
  }
}
