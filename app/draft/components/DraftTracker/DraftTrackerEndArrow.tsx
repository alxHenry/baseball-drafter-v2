import styles from "./DraftTrackerEndArrow.module.css";

import { FC, useCallback, useEffect, useRef, useState } from "react";

interface Props {}

const DraftTrackerEndArrow: FC<Props> = () => {
  const startDetectorRef = useRef(null);
  const endDetectorRef = useRef(null);
  const [startIsVisible, setStartIsVisible] = useState(true);
  const [endIsVisible, setEndIsVisible] = useState(false);

  const handleStartIntersection: IntersectionObserverCallback = useCallback((entries) => {
    const entry = entries[0];
    setStartIsVisible(entry.isIntersecting);
  }, []);
  const handleEndIntersection: IntersectionObserverCallback = useCallback((entries) => {
    const entry = entries[0];
    setEndIsVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleStartIntersection, { threshold: 0 });
    const element = startDetectorRef.current;

    if (element != null) {
      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    }
  }, [handleStartIntersection]);
  useEffect(() => {
    const observer = new IntersectionObserver(handleEndIntersection, { threshold: 0 });
    const element = endDetectorRef.current;

    if (element != null) {
      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    }
  }, [handleEndIntersection]);

  const startScrollArrow = startIsVisible ? null : (
    <div className={`${styles.overlayedArrow} ${styles.startArrow}`}>{"<"}</div>
  );
  const endScrollArrow = endIsVisible ? null : (
    <div className={`${styles.overlayedArrow} ${styles.endArrow}`}>{">"}</div>
  );
  return (
    <>
      <div ref={startDetectorRef} className={`${styles.detector} ${styles.startDetector}`} />
      {startScrollArrow}
      <div ref={endDetectorRef} className={`${styles.detector} ${styles.endDetector}`} />
      {endScrollArrow}
    </>
  );
};

export default DraftTrackerEndArrow;
