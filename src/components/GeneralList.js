import "../App.css";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import HeroCard from "./HeroCard";
import searchLogo from "../assets/search/search.svg";
import { useMediaQuery } from "@mui/material";

const GeneralList = ({
  generalList,
  addFavorite,
  search,
  handleChange,
  searchList,
}) => {
  const S = useMediaQuery("(min-width:360px)");
  const M = useMediaQuery("(min-width:600px)");
  const L = useMediaQuery("(min-width:1024px)");
  const XL = useMediaQuery("(min-width:1600px)");

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

  const gridPosition = (col, row) => row * 6 + col;
  const grid = {
    columns: 0,
  };

  if (XL) {
    grid.columns = 6;
  } else if (L) {
    grid.columns = 4;
  } else if (M) {
    grid.columns = 3;
  } else if (S) {
    grid.columns = 2;
  } else {
    grid.columns = 2;
  }

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
            <Grid
              columnCount={grid.columns}
              columnWidth={width / grid.columns}
              height={600}
              rowCount={Math.ceil(generalList.length / grid.columns)}
              overscanRowCount={20}
              rowHeight={205}
              width={1350}
            >
              {({ columnIndex, rowIndex, style }) => {
                const i = gridPosition(columnIndex, rowIndex);
                return <Row style={style} index={i} />;
              }}
            </Grid>
          )}
        </AutoSizer>
      ) : (
        <h3>NOT FOUND</h3>
      )}
    </div>
  );
};
export default GeneralList;
