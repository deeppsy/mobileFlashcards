import AsyncStorage from "@react-native-async-storage/async-storage";

import Data from "./_Data";

export const DECKS_STORAGE_KEY = "MOBILEFLASHCARDS:DECKS";

export function getDecksFromDB() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((res) => {
      if (res === "null") {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(Data));
        return Data;
      }
      return JSON.parse(res);
    })
    .catch((e) => {
      console.warn("Unable to get decks", e);
    });
}

export function getDeckFromDB(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((res) => {
      return JSON.parse(res)[id];
    })
    .catch((e) => {
      console.warn(`Unable to get deck ${id}`, e);
    });
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

export function removeDeckFromDB(key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((res) => {
      const data = JSON.parse(res);
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    })
    .catch((e) => {
      console.warn(`unable to remove deck ${key}`, e);
    });
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((res) => {
      const data = JSON.parse(res);
      const deck = data[title];

      const updatedQuestions = [...deck.questions, card];

      return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
          [title]: {
            title,
            quuestions: updatedQuestions,
          },
        })
      );
    })
    .catch((e) => console.warn(`Unable to add new card to deck ${title} `, e));
}

export function resetDecks() {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY).catch((e) =>
    console.warn("Unable to reset decks")
  );
}
