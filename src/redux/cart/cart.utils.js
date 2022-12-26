export const addItemToCart = (cartItems, cartItemToAdd) => {
  const filteredItem = cartItems.find(item => item.id === cartItemToAdd.id);
  if (filteredItem) {
    return cartItems.map((item) => item.id === cartItemToAdd.id ? 
    { ...item, quantity: item.quantity + 1 } : item);
  }
  return [...cartItems, {...cartItemToAdd, quantity: 1}];
}