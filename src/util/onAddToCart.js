export const onAddToCart = (
  setShoppingCart,
  book,
  quantity,
  shoppingCart,
  dispatch
) => {
  const bookss = { ...book, quantity: Number(quantity) };
  const isShoppingCartEmpty = shoppingCart.length === 0;
  if (isShoppingCartEmpty) {
    dispatch(setShoppingCart([bookss]));
  } else {
    const isDuplicated =
      shoppingCart.filter((a) => a.isbn === bookss.isbn).length === 0;
    if (!isDuplicated) {
      const increaseQuantity = shoppingCart.map((a) =>
        a.isbn === bookss.isbn
          ? { ...a, quantity: a.quantity + Number(quantity) }
          : a
      );
      dispatch(setShoppingCart(increaseQuantity));
    } else {
      const concatArray = shoppingCart.concat(bookss);
      dispatch(setShoppingCart(concatArray));
    }
  }
};

export default onAddToCart;
