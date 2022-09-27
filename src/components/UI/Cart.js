import classes from "./Cart.module.css";

const Cart = (props) => {
    return (
    <div className={classes.cart}>
        <label>{props.label}</label>
        {props.children}
    </div>)
}
export default Cart;