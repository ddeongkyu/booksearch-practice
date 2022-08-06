import { useEffect, useRef, useState } from "react";
import { observe } from "react-intersection-observer";

export const useIntersectionObserver = (callback) => {
  const [target, setTarget] = useState(null);
  const observer = useRef(
    new observe(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        callback();
      },
      { threshold: 1 }
    )
  );

  useEffect(() => {
    const currentTarget = target;
    const currentObserver = observer.current;
    if (currentTarget) {
      currentObserver.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        currentObserver.unobserve(currentTarget);
      }
    };
  }, [target]);

  return setTarget;
};
