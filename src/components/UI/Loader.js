import classes from "./Loader.module.css";

const Loader = () => {
    return(
        <div className={classes['spinner-container'] }>
            <div className={classes['loading-spinner']}/>
            <label>loading...</label>
        </div>
    )
}
export default Loader;