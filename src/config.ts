export const config = {
  ETSY_BASE_URL:
    process.env['ETSY_API_BASE_URL'] || 'https://openapi.etsy.com/v2',
  ETSY_API_KEY: process.env['ETSY_API_KEY'] || '',
  ETSY_DATASET_LIMIT: process.env['ETSY_LISTING_LIMIT'] || '25',
  ETSY_STORES: process.env['ETSY_STORES_TO_CHECK']?.split(',') || []
};
