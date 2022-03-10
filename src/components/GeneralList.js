import "../App.css";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import HeroCard from "./HeroCard";
import searchLogo from "../assets/search/search.svg";

const GeneralList = ({
  generalList,
  addFavorite,
  search,
  handleChange,
  searchList,
}) => {
  if (generalList.length < 1) return null;

  localStorage.setItem("generalList", JSON.stringify(generalList));
  const storageData = JSON.parse(localStorage.getItem("generalList"));

  const Row = ({ style, index }) => {
    return searchList.length > 0 && search.length > 0 ? (
      <HeroCard
        name={searchList[index] ? searchList[index].name : "no name"}
        realname={
          searchList[index]
            ? searchList[index].biography.fullName
            : "no fullname"
        }
        img={searchList[index] ? searchList[index].images.sm : "no image"}
        style={style}
        id={searchList[index] ? searchList[index].id : "0000"}
        powerstats={
          searchList[index] ? searchList[index].powerstats : { power: 0 }
        }
        addFavorite={addFavorite}
      ></HeroCard>
    ) : (
      <HeroCard
        name={storageData[index] ? storageData[index].name : "no name"}
        realname={
          storageData[index]
            ? storageData[index].biography.fullName
            : "no fullname"
        }
        img={storageData[index] ? storageData[index].images.sm : "no image"}
        style={style}
        id={storageData[index] ? storageData[index].id : "0000"}
        powerstats={
          storageData[index] ? storageData[index].powerstats : { power: 0 }
        }
        addFavorite={addFavorite}
      ></HeroCard>
    );
  };

  return (
    <div className="generalList container">
      <div className="generalList__container">
        <h2>All SuperHeroes</h2>
        <div className="generalList__search">
          <img src={searchLogo} alt="busqueda" className="generalList__img" />
          <input
            type="search"
            value={search}
            onChange={handleChange}
            name="search"
          />
        </div>
      </div>
      {generalList.length >= 0 ? (
        <AutoSizer>
          {({ width }) => (
            <List height={600} itemCount={1000} itemSize={370} width={width}>
              {Row}
            </List>
          )}
        </AutoSizer>
      ) : (
        <h3>NOT FOUND</h3>
      )}
    </div>
  );
};
export default GeneralList;
