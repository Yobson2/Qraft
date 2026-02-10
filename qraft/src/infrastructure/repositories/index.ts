import { InMemoryQRCodeRepository } from './InMemoryQRCodeRepository';
import { InMemoryAssetRepository } from './InMemoryAssetRepository';

// Shared singleton instances across all API routes.
// Note: On Vercel serverless, these reset on cold starts.
// Replace with a persistent database for production use.
export const qrCodeRepository = new InMemoryQRCodeRepository();
export const assetRepository = new InMemoryAssetRepository();
