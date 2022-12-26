import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
  showCart: false,
  cartItems: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'TOGGLE_CART_HIDDEN':
      return {
        ...state,
        showCart: !state.showCart
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, payload)
      }
    default:
      return state;
  }
}

export default cartReducer;
