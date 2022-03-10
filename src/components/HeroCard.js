import { useMemo } from "react";
import heart from "../assets/big-heart/big-heart.svg";
import heartFilled from "../assets/medium-filled-heart/medium-filled-heart.svg";
import powerLogo from "../assets/fist/fist.svg";

const HeroCard = ({
  style,
  name,
  realname,
  img,
  powerstats,
  id,
  addFavorite,
  removeFavorite,
  added = false,
}) => {
  let power = useMemo(() => {
    if (!powerstats) return null;
    let result;
    for (let key in powerstats) {
      result = powerstats[key];
    }

    return result / 10;
  }, [powerstats]);
  return (
    <article className="hero" style={style}>
      <div className="hero__container">
        <div className="hero__img-box">
          <img src={img} alt={name} className="hero__img" />
          <button
            className="hero__button"
            onClick={() => (added ? removeFavorite(id) : addFavorite(id))}
          >
            <img src={added ? heartFilled : heart} alt="HEART" />
          </button>
        </div>
        <div className="hero__data">
          <h3>{name}</h3>
          <p>Real Name: {realname}</p>
          <p>
            <span className="hero__power">
              <img src={powerLogo} alt="pLogo" /> {power}/10
            </span>
          </p>
        </div>
      </div>
    </article>
  );
};
export default HeroCard;
