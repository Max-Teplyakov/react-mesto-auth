import logo from "../images/logo.svg";
import navBar from "../images/navBar.png";
import btnClose from "../images/Close-Icon.png";
import { Link } from "react-router-dom";

function Header({ text, link, name, signOut }) {
  return (
    <header className="header">
      <img src={logo} alt="логотип Сайта" className="header__img" />
      <img className="header__navBar" src={navBar} />
      <img className="header__btnClose" src={btnClose} />
      <div className="header__component">
        <p className="header__name">{name}</p>
        <Link className="header__btn" to={`/${link}`} onClick={signOut}>
          {text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
