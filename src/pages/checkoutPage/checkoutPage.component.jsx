import React from "react";
import "./checkoutPage.styles.scss";
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart-selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

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
    <div className="test-warning">
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
    </div>
    <StripeCheckoutButton price={cartTotal} />
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);