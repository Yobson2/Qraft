import { NextRequest, NextResponse } from 'next/server';
import { GenerateQRCode } from '@/domain/use-cases/GenerateQRCode';
import { InMemoryQRCodeRepository } from '@/infrastructure/repositories/InMemoryQRCodeRepository';
import { QRCodeStyle } from '@/domain/entities/QRCodeStyle';
import { Color } from '@/domain/value-objects/Color';
import { Size } from '@/domain/value-objects/Size';
import { ErrorCorrectionLevel, ErrorCorrectionLevelType } from '@/domain/value-objects/ErrorCorrectionLevel';

// Singleton repository for demo purposes
const qrCodeRepository = new InMemoryQRCodeRepository();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { payload, style, userId } = body;

    // Validate required fields
    if (!payload) {
      return NextResponse.json(
        { error: 'Payload is required' },
        { status: 400 }
      );
    }

    // Build style object
    const qrCodeStyle = new QRCodeStyle(
      new Color(style?.foregroundColor || '#000000'),
      new Color(style?.backgroundColor || '#FFFFFF'),
      new ErrorCorrectionLevel(
        (style?.errorCorrectionLevel as ErrorCorrectionLevelType) || ErrorCorrectionLevelType.MEDIUM
      ),
      new Size(style?.size?.width || 256, style?.size?.height || 256),
      style?.margin || 4,
      style?.logo,
      style?.shape,
      style?.quietZone || 4
    );

    // Execute use case
    const generateQRCode = new GenerateQRCode(qrCodeRepository);
    const qrCode = await generateQRCode.execute({
      payload,
      style: qrCodeStyle,
      userId,
    });

    return NextResponse.json(qrCode.toJSON(), { status: 201 });
  } catch (error) {
    console.error('Error creating QR code:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create QR code' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId parameter is required' },
        { status: 400 }
      );
    }

    const qrCodes = await qrCodeRepository.findByUserId(userId);
    return NextResponse.json(qrCodes.map((qr) => qr.toJSON()));
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch QR codes' },
      { status: 500 }
    );
  }
}
