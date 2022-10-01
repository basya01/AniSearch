import { useEffect, useRef, useState } from "react";

export const useScreenWidth = () => {
  const [width, setWidth] = useState<null | number>(null);
  
  const observer = useRef(
    new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setWidth(width);
    }),
  );

  useEffect(() => {
    observer.current.observe(document.documentElement);
  }, [document.documentElement, observer]);

  return width;
};
