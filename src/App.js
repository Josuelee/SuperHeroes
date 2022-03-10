import { useReducer, useEffect, useState } from "react";
import { heroInitialState, heroReducer } from "./reducers/heroReducer";
import { TYPES } from "./actions/heroActions";
import FavoriteList from "./components/FavoriteList";
import GeneralList from "./components/GeneralList";
import MainHeader from "./components/MainHeader";

const App = () => {
  const [state, dispatch] = useReducer(heroReducer, heroInitialState);
  const { generalList, favoritesList, searchList } = state;

  const [search, setSearch] = useState("");

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
    // localStorage.setItem("generalList", "[]");
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

    // delete from favoritos
    const removData = localFavorites.filter((el) => el.id !== findHero.id);
    localStorage.setItem("favoriteHeros", JSON.stringify(removData));

    // add generalList
    localStorage.setItem("generalList", [findHero, ...localGeneral]);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length <= 0) {
      dispatch({ type: "CLEAR_SEARCH" });
    }
    dispatch({ type: TYPES.FILTER_SEARCH, payload: e.target.value });
  };

  return (
    <div>
      <MainHeader />
      <FavoriteList
        removeFavorite={removeFavorite}
        favoritesList={favoritesList}
      />
      <GeneralList
        generalList={generalList}
        addFavorite={addFavorite}
        search={search}
        handleChange={handleChange}
        searchList={searchList}
      />
    </div>
  );
};
export default App;
