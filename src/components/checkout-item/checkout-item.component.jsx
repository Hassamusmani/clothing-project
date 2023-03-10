import React from "react";
import "./checkout-item.styles.scss";
import { connect } from 'react-redux'
import { addToCart, removeFromCart, removeItem } from "../../redux/cart/cart-actions";

const CheckoutItem = ({cartItem, dispatch}) => {
  const { id, name, quantity, imageUrl, price } = cartItem;
  return (
  <div className="checkout-item">
    <div className="image-container">
      <img src={imageUrl} alt="item" />
    </div>
    <span className="name">{name}</span>
    <span className="quantity">
      <div className="arrow" onClick={() => dispatch(removeItem(id))}>&#10094;</div>
      <span className="value">{quantity}</span>
      <div className="arrow" onClick={() => dispatch(addToCart(cartItem))}>&#10095;</div>
    </span>
    <span className="price">${price}</span>
    <div className="remove-button" onClick={() => dispatch(removeFromCart(id))}>&#10005;</div>
  </div>
)}

export default connect()(CheckoutItem);