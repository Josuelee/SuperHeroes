import "../App.css";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import HeroCard from "./HeroCard";

const GeneralList = ({ generalList, addFavorite }) => {
  if (generalList.length < 1) return null;

  localStorage.setItem("generalList", JSON.stringify(generalList));
  const storageData = JSON.parse(localStorage.getItem("generalList"));

  const Row = ({ style, index }) => {
    return (
      <HeroCard
        name={storageData[index].name}
        realname={storageData[index].biography.fullName}
        img={storageData[index].images.sm}
        style={style}
        id={storageData[index].id}
        powerstats={storageData[index].powerstats}
        addFavorite={addFavorite}
      ></HeroCard>
    );
  };

  return (
    <div>
      <h2>LISTA GENERAL</h2>
      <AutoSizer>
        {({ width }) => (
          <section>
            <List
              className="GeneralList"
              height={550}
              itemCount={1000}
              itemSize={370}
              width={width}
            >
              {Row}
            </List>
          </section>
        )}
      </AutoSizer>
    </div>
  );
};
export default GeneralList;
