import { TYPES } from "../actions/heroActions";

export const heroInitialState = {
  favoritesList: [],
  generalList: [],
  searchList: [],
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
        ...state,
        favoritesList: [...state.favoritesList, action.payload],
        generalList: state.generalList.filter((el) => el.id !== action.payload),
      };

    case TYPES.REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favoritesList: state.favoritesList.filter(
          (el) => el !== action.payload.id
        ),
        generalList: [action.payload, ...state.generalList],
      };

    case TYPES.FILTER_SEARCH:
      return {
        ...state,
        searchList: state.generalList.filter((el) =>
          el.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        searchList: [],
      };
    default:
      return state;
  }
};
