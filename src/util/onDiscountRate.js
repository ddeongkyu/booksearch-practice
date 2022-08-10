const onDiscountRate = (a, b) => {
  if (a > 0) {
    return Math.ceil(((b - a) / b) * 100);
  } else if (a <= 0) {
    return 0;
  }
};
export default onDiscountRate;
