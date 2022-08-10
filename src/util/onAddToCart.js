export const onAddToCart = (setShoppingCart, book, quantity) => {
  setShoppingCart((prev) => {
    const finded = prev.find((order) => order.book === book);
    if (!finded) {
      return [...prev, { book, quantity: quantity }];
    } else {
      return prev.map((order) => {
        if (order.book.isbn === book.isbn) {
          return {
            book,
            quantity: order.quantity + 1,
          };
        } else {
          return order;
        }
      });
    }
  });
};

export default onAddToCart;
