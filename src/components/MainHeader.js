import Logo from "../assets/logo/logo.svg";

const MainHeader = () => {
  return (
    <header className="main-header">
      <h2>HEADER</h2>
      <div className="img-container">
        <img src={Logo} alt="LOGO" className="img-item" />
      </div>
    </header>
  );
};
export default MainHeader;
