export interface FrequencyDictionary {
  [key: string]: number;
}

export class WordProcessor {
  // TODO: Figure out a definitive regex for figuring out words we care about
  // This current one will ignore the encoding of quotations that the API returns which
  // will probably always be greater than any word.
  // We could alternative get rid of certain conjuction words or words that hold no weight such as (And,The,A,etc) as well.
  static extractWordsFromString(stringToExtract: string): string[] {
    // TODO: add html entity decoder to get rid of other entities that may pollute
    return (
      (stringToExtract.match(
        /(?!(?:\bquot\b))(\b[^\d\W]{2,}\b)/g
      ) as string[]) || []
    );
  }

  static getFrequencyDictionaryOfWordsFromList(
    listOfWords: string[]
  ): FrequencyDictionary | null {
    if (!listOfWords || !listOfWords.length) return null;

    const wordFrequencyDictionary: FrequencyDictionary = {};

    for (const word of listOfWords) {
      // lower casing will make the check more accurate
      const lowerCasedWord = word.toLowerCase();
      if (wordFrequencyDictionary[lowerCasedWord]) {
        wordFrequencyDictionary[lowerCasedWord]++;
      } else {
        wordFrequencyDictionary[lowerCasedWord] = 1;
      }
    }

    return wordFrequencyDictionary;
  }

  static getPopularTermsFromFrequencyDictionary(
    frequencyDictionary: FrequencyDictionary | null,
    maxNumberToGet: number = 5
  ): [string, number][] | null {
    if (!frequencyDictionary) return null;

    const sortedListOfPopularTerms = Object.entries(frequencyDictionary).sort(
      (a, b) => b[1] - a[1]
    );

    return sortedListOfPopularTerms.slice(0, maxNumberToGet);
  }
}
