import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import image from '../../assets/favicon.ico';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51MLGz9JycL6PqSRYrpdnFk0M7R8hyz4gXthTwEnh32RAayXjcJc9Ploltol5N4Spa9cQk3zjaJTp1ZshkWBBcfoA00Ki6QTigT';

  const tockenHandler = (token) => {
    console.log(token);
    alert('Payment Successful 🎆');
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="Brand Clothing"
      billingAddress
      shippingAddress
      image={image}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={tockenHandler}
      stripeKey={publishableKey}
    />
  );
}

export default StripeCheckoutButton;