import { TYPES } from "../actions/heroActions";

export const heroInitialState = {
  favoritesList: [],
  generalList: [],
};

export const heroReducer = (state, action) => {
  switch (action.type) {
    case TYPES.READ_ALL_HEROS:
      return {
        ...state,
        generalList: action.payload,
      };

    case TYPES.ADD_TO_FAVORITE:
      return {
        favoritesList: [...state.favoritesList, action.payload],
        generalList: state.generalList.filter((el) => el.id !== action.payload),
      };

    case TYPES.REMOVE_FROM_FAVORITE:
      return {
        favoritesList: state.favoritesList.filter(
          (el) => el !== action.payload.id
        ),
        generalList: [action.payload, ...state.generalList],
      };
    default:
      return state;
  }
};
