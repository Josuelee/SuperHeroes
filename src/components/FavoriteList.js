import HeroCard from "./HeroCard";

const FavoriteList = ({ removeFavorite, favoritesList }) => {
  const localFavorite = JSON.parse(localStorage.getItem("favoriteHeros"));

  return (
    <div>
      <h2>FAVORITE LIST</h2>
      <section className="heros-general">
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
