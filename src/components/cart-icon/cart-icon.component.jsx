import React from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-bag.svg";
import { connect } from 'react-redux'
import { toggleCartHidden } from "../../redux/cart/cart-actions";
import { selectItemCount } from "../../redux/cart/cart-selectors";
import { createStructuredSelector } from "reselect";

const CartIcon = ({ toggleCartHidden, itemsCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingCartIcon className="shopping-icon" />
    <span className="item-count">{itemsCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
  itemsCount: selectItemCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);