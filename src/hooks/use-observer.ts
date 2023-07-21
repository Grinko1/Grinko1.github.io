import { RefObject, useEffect, useRef } from "react";

export const useObserver = (
  ref: RefObject<Element>,
  canLoad: boolean,
  waiting: boolean,
  callback: () => void
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  console.log(ref, 'ref from observer')
  useEffect(() => {
    if (waiting) return;
    if (observer.current) observer.current.disconnect();
    setTimeout(() => {
  const cb: IntersectionObserverCallback = function (entries, observer) {
   
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    if (ref.current) {
      observer.current = new IntersectionObserver(cb);
      observer.current.observe(ref.current);
    }
    },1)
  

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref.current, waiting, canLoad]);
};
