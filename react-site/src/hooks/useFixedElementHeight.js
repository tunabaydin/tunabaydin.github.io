import { useLayoutEffect, useRef } from "react";

export default function useFixedElementHeight(property) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    const root = document.documentElement;

    const measure = () => {
      root.style.setProperty(property, `${element.getBoundingClientRect().height}px`);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element, { box: "border-box" });

    return () => {
      observer.disconnect();
      root.style.removeProperty(property);
    };
  }, [property]);

  return ref;
}
