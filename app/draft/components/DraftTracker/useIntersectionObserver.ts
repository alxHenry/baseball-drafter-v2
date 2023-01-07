import { MutableRefObject, useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  readonly intersectingRef: MutableRefObject<null | HTMLElement>;
}
interface ReturnValue {
  readonly isVisible: boolean;
}

export const useIntersectionObserver = ({ intersectingRef }: Props): ReturnValue => {
  const [isVisible, setIsVisible] = useState(false);
  const handleIntersection: IntersectionObserverCallback = useCallback((entries) => {
    const entry = entries[0];
    setIsVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0 });
    const element = intersectingRef.current;

    if (element != null) {
      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    }
  }, [handleIntersection, intersectingRef]);

  return useMemo(
    () => ({
      isVisible,
    }),
    [isVisible]
  );
};
