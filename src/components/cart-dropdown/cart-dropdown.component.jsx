import React from "react";
import CartItem from "../cart-item/cart-item.component";
import { CustomButton } from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";
import { connect } from 'react-redux'
import { selectCartItems } from "../../redux/cart/cart-selectors";
import { createStructuredSelector } from "reselect";
import { useNavigate } from "react-router-dom";

const CartDropdown = ({ cartItems }) => {
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? cartItems.map(item => <CartItem key={item.id} item={item} />)
          : <span className="empty-message">Your cart is empty :(</span>}
      </div>
      <CustomButton onClick={() => { navigate('/checkout'); }}>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(CartDropdown);