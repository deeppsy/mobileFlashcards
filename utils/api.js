import AsyncStorage from "@react-native-async-storage/async-storage";

import Data from "./_Data";

export const CALENDAR_STORAGE_KEY = "MOBILE:FLASHCARDS";

export function getDecksFromDB() {
  return Data;
}

export function getDeckFromDB(id) {
  return Data[id];
}
