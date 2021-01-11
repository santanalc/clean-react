import React, { memo } from "react";
import Styles from "./header-styles.scss";
import logo from "../../images/logo.svg";

const Header: React.FC = () => {
  return (
    <header className={Styles.header}>
      <img src={logo} />
      <h1>4Dev</h1>
    </header>
  );
};

export default memo(Header);
