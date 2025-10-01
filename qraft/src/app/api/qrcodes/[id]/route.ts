import { NextRequest, NextResponse } from 'next/server';
import { FetchQRCode } from '@/domain/use-cases/FetchQRCode';
import { UpdateQRCode } from '@/domain/use-cases/UpdateQRCode';
import { DeleteQRCode } from '@/domain/use-cases/DeleteQRCode';
import { InMemoryQRCodeRepository } from '@/infrastructure/repositories/InMemoryQRCodeRepository';
import { InMemoryAssetRepository } from '@/infrastructure/repositories/InMemoryAssetRepository';
import { QRCodeStyle } from '@/domain/entities/QRCodeStyle';
import { Color } from '@/domain/value-objects/Color';
import { Size } from '@/domain/value-objects/Size';
import { ErrorCorrectionLevel, ErrorCorrectionLevelType } from '@/domain/value-objects/ErrorCorrectionLevel';

// Singleton repositories for demo purposes
const qrCodeRepository = new InMemoryQRCodeRepository();
const assetRepository = new InMemoryAssetRepository();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fetchQRCode = new FetchQRCode(qrCodeRepository);
    const qrCode = await fetchQRCode.execute(id);

    return NextResponse.json(qrCode.toJSON());
  } catch (error) {
    console.error('Error fetching QR code:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch QR code' },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { payload, style } = body;

    let qrCodeStyle: QRCodeStyle | undefined;
    if (style) {
      qrCodeStyle = new QRCodeStyle(
        new Color(style.foregroundColor || '#000000'),
        new Color(style.backgroundColor || '#FFFFFF'),
        new ErrorCorrectionLevel(
          (style.errorCorrectionLevel as ErrorCorrectionLevelType) || ErrorCorrectionLevelType.MEDIUM
        ),
        new Size(style.size?.width || 256, style.size?.height || 256),
        style.margin || 4,
        style.logo,
        style.shape,
        style.quietZone || 4
      );
    }

    const updateQRCode = new UpdateQRCode(qrCodeRepository);
    const qrCode = await updateQRCode.execute({
      id,
      payload,
      style: qrCodeStyle,
    });

    return NextResponse.json(qrCode.toJSON());
  } catch (error) {
    console.error('Error updating QR code:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update QR code' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleteQRCode = new DeleteQRCode(qrCodeRepository, assetRepository);
    await deleteQRCode.execute(id);

    return NextResponse.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    console.error('Error deleting QR code:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete QR code' },
      { status: 500 }
    );
  }
}
