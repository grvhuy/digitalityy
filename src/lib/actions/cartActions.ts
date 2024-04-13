export const addToCart = (product: any) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

export const removeFromCart = (productId: any) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
});
