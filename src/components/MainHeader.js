import Logo from "../assets/logo/logo.svg";

const MainHeader = () => {
  return (
    <header className="header">
      <div className="header__img-container">
        <img src={Logo} alt="LOGO" className="img-item" />
      </div>
    </header>
  );
};
export default MainHeader;
