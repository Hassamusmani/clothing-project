import React from "react";
import "./checkoutPage.styles.scss";
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart-selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const CheckoutPage = ({ cartItems, cartTotal }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="hearer-block">
        <span>Product</span>
      </div>
      <div className="hearer-block">
        <span>Description</span>
      </div>
      <div className="hearer-block">
        <span>Quantity</span>
      </div>
      <div className="hearer-block">
        <span>Price</span>
      </div>
      <div className="hearer-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(item => <CheckoutItem key={item.id} cartItem={item} />)}
    <div className="total">
      <span>TOTAL: ${cartTotal}</span>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);