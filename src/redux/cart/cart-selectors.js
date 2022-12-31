import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectShowCart = createSelector(
  [selectCart],
  (cart) => cart.showCart
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectItemCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
);