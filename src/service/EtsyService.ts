import { WordProcessor } from './WordProcessor';
import { config } from '../config';
import axios from 'axios';

export interface EtsyItem {
  title: string;
  description: string;
}

export class EtsyService {
  // Since this class does not need to be constructed more than once I decided
  // to go with a singleton. An alternative would be to create a constructable class
  // and pass in the API key and base url through a config or simply values ONLY if it needs
  // different values for its members.
  // Another note, this also gets rid of having to deal with 'this' in javascript.
  private static API_URL: string = config.ETSY_BASE_URL;
  private static API_KEY: string = config.ETSY_API_KEY;
  private static API_DATA_LIMIT: string = config.ETSY_DATASET_LIMIT;

  static getDefaultListingsByShopId = async (
    shopId: string
  ): Promise<EtsyItem[] | null> => {
    const response = await axios.get(
      `${EtsyService.API_URL}/shops/${shopId}/listings/active?api_key=${EtsyService.API_KEY}`
    );

    if (!response || !response.data) return null;

    return response.data.results;
  };

  // TODO: Not sure if the requirements literally wanted ALL items or just the given defaults so
  // I built two functions, one that will get the default amount of items and one that will
  // get ALL items. Only call this if needed or for fun because it will take some time.
  static getAllListingsByShopId = async (
    shopId: string
  ): Promise<EtsyItem[] | null> => {
    const allListings: EtsyItem[] = [];

    let currentOffset: number = 0;

    while (true) {
      const response = await axios.get(
        `${EtsyService.API_URL}/shops/${shopId}/listings/active?api_key=${EtsyService.API_KEY}&limit=${EtsyService.API_DATA_LIMIT}&offset=${currentOffset}`
      );
      if (!response) {
        return null;
      }

      const {
        count,
        params: { limit }
      } = response.data;

      allListings.push(...response.data.results);

      if (currentOffset >= count) {
        break;
      }

      currentOffset += parseInt(limit);
    }

    return allListings;
  };

  static getTopTermsByShopId = async (
    shopId: string,
    amountToReturn?: number
  ) => {
    const wordList: RegExpMatchArray = [];
    try {
      // TODO: If you want ALL items, replace this function with the ALL variant.
      const storeInventory = await EtsyService.getDefaultListingsByShopId(
        shopId
      );
      if (!storeInventory) {
        return [];
      }
      for (const item of storeInventory) {
        const wordsFromTitleAndDescription = WordProcessor.extractWordsFromString(
          item.title + item.description
        );
        wordList.push(...wordsFromTitleAndDescription);
      }
    } catch (e) {
      // We want to continue on with other stores if one
      // fails to resolve a value
      console.error(e);
    }

    const frequencyDictionary = WordProcessor.getFrequencyDictionaryOfWordsFromList(
      wordList
    );

    const topTerms = WordProcessor.getPopularTermsFromFrequencyDictionary(
      frequencyDictionary,
      amountToReturn
    );
    return topTerms;
  };
}
