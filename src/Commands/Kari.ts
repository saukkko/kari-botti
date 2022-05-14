import { readFile } from "fs/promises";
import type { WordList } from "../types/Words";
import { capitalize } from "../util.js";

const wordFileToJSON = async (fileName: string): Promise<WordList> =>
  readFile(fileName)
    .then((data) => JSON.parse(data.toString()))
    .catch(console.error);

const wordList = await wordFileToJSON("./words.json");

const getRandomKA = async (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      const randA = rng(0, wordList.a.length - 1);
      const randK = rng(0, wordList.k.length - 1);
      const wordPair = [wordList.k[randK], wordList.a[randA]];

      resolve(wordPair);
    } catch (err) {
      reject(err);
    }
  });
};

const rng = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const kariCommand = async () => {
  try {
    const wordPair = await getRandomKA();
    return `Kari "${wordPair
      .map((word) => capitalize(word))
      .join(" ")}" Häkkinen`;
  } catch (err) {
    console.error(err);
    return "Error";
  }
};
