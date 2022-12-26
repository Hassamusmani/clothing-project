import React from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-bag.svg";
import { connect } from 'react-redux'
import { toggleCartHidden } from "../../redux/cart/cart-actions";

const CartIcon = ({ toggleCartHidden, itemsCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingCartIcon className="shopping-icon" />
    <span className="item-count">{itemsCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = ({ cart: {cartItems} }) => ({
  itemsCount: cartItems.reduce((total, item) => total + item.quantity, 0),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);