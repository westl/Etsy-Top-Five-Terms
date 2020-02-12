import { EtsyService } from './EtsyService';
// Jest will automock the API calls and return undefined for each one
// so that we aren't making real network calls.
// We just need to ensure the call was being made with proper inputs
import axios from 'axios';
import { config } from '../config';
jest.mock('axios');

describe('EtsyService', () => {
  test('it should attempt to get the default items from the given shop id', async () => {
    const response = await EtsyService.getDefaultListingsByShopId('123');
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      `${config.ETSY_BASE_URL}/shops/123/listings/active?api_key=${config.ETSY_API_KEY}`
    );
    expect(response).toBe(null);
  });

  test('it should attempt to get all items from the given shop id', async () => {
    const response = await EtsyService.getAllListingsByShopId('16156795');
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      `${config.ETSY_BASE_URL}/shops/16156795/listings/active?api_key=${
        config.ETSY_API_KEY
      }&limit=${config.ETSY_DATASET_LIMIT}&offset=${0}`
    );
    expect(response).toBe(null);
  });
});
