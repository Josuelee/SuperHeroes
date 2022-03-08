import { useReducer, useEffect } from "react";
import { heroInitialState, heroReducer } from "./reducers/heroReducer";
import { TYPES } from "./actions/heroActions";
import FavoriteList from "./components/FavoriteList";
import GeneralList from "./components/GeneralList";
import MainHeader from "./components/MainHeader";

const App = () => {
  const [state, dispatch] = useReducer(heroReducer, heroInitialState);
  const { generalList, favoritesList } = state;

  useEffect(() => {
    fetch("https://akabab.github.io/superhero-api/api/all.json")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        const data = localStorage.getItem("generalList") || "[]";
        const dataStorage = JSON.parse(data);

        if (dataStorage.length > 0) {
          dispatch({ type: TYPES.READ_ALL_HEROS, payload: dataStorage });
        } else {
          dispatch({ type: TYPES.READ_ALL_HEROS, payload: json });
        }
      });
  }, []);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("favoriteHeros"));
    const ids = localData.map((el) => el.id);

    ids.forEach((el) => {
      dispatch({ type: TYPES.ADD_TO_FAVORITE, payload: el });
    });
  }, []);

  const addFavorite = (id) => {
    const findHero = generalList.find((el) => el.id === id);

    const favoriteHeros = localStorage.getItem("favoriteHeros") || "[]";

    localStorage.setItem(
      "favoriteHeros",
      JSON.stringify([...JSON.parse(favoriteHeros), findHero])
    );

    dispatch({ type: TYPES.ADD_TO_FAVORITE, payload: id });
  };

  const removeFavorite = (id) => {
    const localFavorites = JSON.parse(localStorage.getItem("favoriteHeros"));
    const localGeneral = JSON.parse(localStorage.getItem("generalList"));

    const findHero = localFavorites.find((el) => el.id === id);
    dispatch({ type: TYPES.REMOVE_FROM_FAVORITE, payload: findHero });

    // borrar de favoritos
    const removData = localFavorites.filter((el) => el.id !== findHero.id);
    localStorage.setItem("favoriteHeros", JSON.stringify(removData));

    // agregar lista general
    localStorage.setItem("generalList", [findHero, ...localGeneral]);
  };

  return (
    <div>
      <MainHeader />
      <FavoriteList
        removeFavorite={removeFavorite}
        favoritesList={favoritesList}
      />
      <GeneralList generalList={generalList} addFavorite={addFavorite} />
    </div>
  );
};
export default App;
