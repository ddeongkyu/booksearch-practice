export const onAddToCart = (setShoppingCart, book, quantity, shoppingCart) => {
  const bookss = { ...book, quantity: Number(quantity) };
  if (shoppingCart.length === 0) {
    setShoppingCart([bookss]);
  } else if (shoppingCart.length !== 0) {
    const isDuplicated = shoppingCart.filter((a) => a.isbn === bookss.isbn);
    if (isDuplicated.length !== 0) {
      const increaseQuantity = shoppingCart.map((a) =>
        a.isbn === bookss.isbn
          ? { ...a, quantity: a.quantity + Number(quantity) }
          : a
      );
      setShoppingCart(increaseQuantity);
    } else if (isDuplicated.length === 0) {
      const concatArray = shoppingCart.concat(bookss);
      setShoppingCart(concatArray);
    }
  }
};

export default onAddToCart;
