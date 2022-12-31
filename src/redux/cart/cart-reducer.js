import { addItemToCart, reduceItemInCart } from "./cart.utils";

const INITIAL_STATE = {
  showCart: false,
  cartItems: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  console.log(payload);
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
    case 'REDUCE_CART_ITEM':
      return {
        ...state,
        cartItems: reduceItemInCart(state.cartItems, payload)
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => cartItem.id !== payload)
      }
    case 'CLOSE_CART_DROPDOWN':
      return {
        ...state,
        showCart: false
      }
    default:
      return state;
  }
}

export default cartReducer;
