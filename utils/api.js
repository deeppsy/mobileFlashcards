import AsyncStorage from "@react-native-async-storage/async-storage";

import { decks } from "./_Data";

export const DECKS_STORAGE_KEY = "MOBILEFLASHCARDS:DECKS";

export async function getDecksFromDB() {
  try {
    // await AsyncStorage.removeItem(DECKS_STORAGE_KEY);
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if (storeResults === null) {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    }

    return storeResults === null ? decks : JSON.parse(storeResults);
  } catch (err) {
    console.log(err);
  }
}
export async function getDeckFromDB(id) {
  try {
    const res = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    return JSON.parse(res)[id];
  } catch (e) {
    console.warn(`Unable to get deck ${id}`, e);
  }
}

export function saveDeckTitleToDB(title) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    })
  )
    .then(console.log("successfully added a new title"))
    .catch((e) => {
      console.warn("unable to add title new deck to db ", e);
    });
}

export async function removeDeckFromDB(key) {
  try {
    const res = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const data = JSON.parse(res);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn(`unable to remove deck ${key}`, e);
  }
}

export async function addCardToDeckDB(title, card) {
  try {
    const deck = await getDeckFromDB(title);

    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card),
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function resetDecks() {
  try {
    return await AsyncStorage.removeItem(DECKS_STORAGE_KEY);
  } catch (e) {
    return console.warn("Unable to reset decks");
  }
}
