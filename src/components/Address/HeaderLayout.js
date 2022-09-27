import classes from "./HeaderLayout.module.css";
import cryptoImage from "../../assets/cryptocurrency.jpg"
import { Fragment } from "react";

const HeaderLayout = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h2>Know Your Balance</h2>
      </header>
      <div className={classes['main-image']}>
        <img src={cryptoImage} alt="crypto-currency" />
      </div>
    </Fragment>
  );
};
export default HeaderLayout;
