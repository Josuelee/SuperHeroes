import HeroCard from "./HeroCard";
import like from "../assets/small-heart/small-heart.svg";
import arrowUp from "../assets/arrow-up/up.png";
import arrowDown from "../assets/arrow-down/down-arrow.png";
import { useState } from "react";

const localArrow = JSON.parse(localStorage.getItem("arrow")) || false;

const FavoriteList = ({ removeFavorite, favoritesList }) => {
  const localFavorite = JSON.parse(localStorage.getItem("favoriteHeros"));

  const [arrow, setArrow] = useState(localArrow);

  const handleClickArrow = () => {
    if (arrow) {
      localStorage.setItem("arrow", "false");
      setArrow(false);
    } else {
      setArrow(true);
      localStorage.setItem("arrow", "true");
    }
  };

  const favoriteDesactivate = () => arrow || "favoriteList--desactivate";

  const favoriteHeight = () =>
    favoritesList.length > 0 && "favoriteList--height";

  return (
    <div
      className={`container favoritesList ${favoriteDesactivate()} ${favoriteHeight()}`}
    >
      <div className="favoriteList-container">
        <span className="favoriteList__img-container">
          <img className="favoriteList__img" src={like} alt="LIKE" />
        </span>
        <h2>Liked</h2>
        <img
          className="favoriteList__arrow"
          src={arrow ? arrowUp : arrowDown}
          alt="arrow"
          onClick={handleClickArrow}
        />
      </div>
      <section className={`heros-general ${arrow || "heros-general-filter"}`}>
        {localFavorite.map((el) => (
          <HeroCard
            key={el.id}
            name={el.name}
            realname={el.biography.fullName}
            img={el.images.sm}
            id={el.id}
            powerstats={el.powerstats}
            removeFavorite={removeFavorite}
            added={true}
          />
        ))}
      </section>
    </div>
  );
};
export default FavoriteList;
