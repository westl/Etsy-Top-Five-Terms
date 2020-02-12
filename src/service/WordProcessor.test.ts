import { WordProcessor, FrequencyDictionary } from './WordProcessor';

describe('Word Processor', () => {
  test.each([
    ['1 is the loneliest number', ['is', 'the', 'loneliest', 'number']],
    ['7 eight 9 4 dinner', ['eight', 'dinner']],
    ['12 3 4 5 6 123 123 1233 -2 -10', []]
  ])(
    'it should return an array of extracted words from a given string',
    (inputString: string, expectedArrayOfStrings: string[]) => {
      expect(WordProcessor.extractWordsFromString(inputString)).toStrictEqual(
        expectedArrayOfStrings
      );
    }
  );

  test.each([
    [
      ['again', 'again', 'again', 'again', 'and', 'again'],
      { again: 5, and: 1 }
    ],
    [['one'], { one: 1 }],
    [[], null]
  ])(
    'it should return a frequency dictionary when given a word list or null if the word list is empty',
    (
      wordList: string[],
      expectedFrequencyDictionary: FrequencyDictionary | null
    ) => {
      expect(
        WordProcessor.getFrequencyDictionaryOfWordsFromList(wordList)
      ).toStrictEqual(expectedFrequencyDictionary);
    }
  );

  test.each([
    [
      { again: 5, and: 1 } as FrequencyDictionary,
      [
        ['again', 5],
        ['and', 1]
      ] as [string, number][]
    ],
    [
      {
        body: 505,
        length: 100,
        lamar: 999,
        simon: 1000,
        home: 5,
        mug: 10,
        coffee: 1001
      } as FrequencyDictionary,
      [
        ['coffee', 1001],
        ['simon', 1000],
        ['lamar', 999],
        ['body', 505],
        ['length', 100]
      ] as [string, number][]
    ],
    [null, null]
  ])(
    'it should return an array of top terms, given a frequency dictionary',
    (
      frequencyDictionary: FrequencyDictionary | null,
      expectedArrayOfTopFrequencies: [string, number][] | null
    ) => {
      expect(
        WordProcessor.getPopularTermsFromFrequencyDictionary(
          frequencyDictionary
        )
      ).toStrictEqual(expectedArrayOfTopFrequencies);
    }
  );
});
