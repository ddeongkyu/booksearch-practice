const useIntersectionAnimation = (className, option, querySelector) => {
  const useObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
      } else {
        entry.target.classList.remove(className);
      }
    });
  }, option);
  const imgList = document.querySelectorAll(`.${querySelector}`);
  imgList.forEach((el) => useObserver.observe(el));
};
export default useIntersectionAnimation;
