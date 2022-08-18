const onDiscountRate = (a, b) => {
  if (a > 0) {
    return Math.ceil(((b - a) / b) * 100);
  } else if (a === -1) {
    return 0;
  } else if (a <= 0) {
    return b;
  }
};
export default onDiscountRate;
