export const toggleCartHidden = () => ({
  type: 'TOGGLE_CART_HIDDEN',
})

export const closeCartDropdown = () => ({
  type: 'CLOSE_CART_DROPDOWN',
})

export const addToCart = (item) => ({
  type: 'ADD_TO_CART',
  payload: item
})

export const removeItem = (id) => ({
  type: 'REDUCE_CART_ITEM',
  payload: id
});

export const removeFromCart = (id) => ({
  type: 'REMOVE_FROM_CART',
  payload: id
})