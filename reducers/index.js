import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  RESET_STORE,
} from "../actions/";

import { decks as INITIAL_STATE } from "../utils/_Data";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title,
          questions: [],
        },
      };

    case REMOVE_DECK:
      const deck = state;
      deck[action.id] = undefined;
      delete deck[action.id];

      return {
        ...deck,
      };

    case ADD_CARD:
      const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [...state[deckId].questions].concat(card),
        },
      };

    case RESET_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default decks;
