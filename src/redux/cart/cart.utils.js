export const addItemToCart = (cartItems, cartItemToAdd) => {
  const filteredItem = cartItems.find(item => item.id === cartItemToAdd.id);
  if (filteredItem) {
    return cartItems.map((item) => item.id === cartItemToAdd.id ? 
    { ...item, quantity: item.quantity + 1 } : item);
  }
  return [...cartItems, {...cartItemToAdd, quantity: 1}];
}

export const reduceItemInCart = (cartItems, itemId) => {
  const filteredItem = cartItems.find(item => item.id === itemId);
  if (filteredItem.quantity > 1) {
    return cartItems.map((item) => item.id === itemId ?
      { ...item, quantity: item.quantity - 1 } : item);
  } else {
    return cartItems.filter(item => item.id !== itemId);
  }
}