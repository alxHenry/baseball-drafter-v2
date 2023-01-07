import styles from "./DraftTrackerArrow.module.css";

import { FC, memo, MutableRefObject, useRef } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { DRAFT_TRACKER_CARD_MIN_WIDTH } from "./DraftTrackerCard";

interface Props {
  readonly isStartArrow: boolean;
  readonly scrollRef: MutableRefObject<null | HTMLElement>;
}

const DraftTrackerArrow: FC<Props> = ({ isStartArrow, scrollRef }) => {
  const detectorRef = useRef(null);
  const { isVisible } = useIntersectionObserver({ intersectingRef: detectorRef });

  const handleScroll = () => {
    if (scrollRef.current == null) {
      return;
    }

    scrollRef.current.scrollBy({
      left: isStartArrow ? DRAFT_TRACKER_CARD_MIN_WIDTH * -1 : DRAFT_TRACKER_CARD_MIN_WIDTH,
      behavior: "smooth",
    });
  };
  const scrollArrow = isVisible ? null : (
    <button
      className={`${styles.overlayedArrow} ${isStartArrow ? styles.startArrow : styles.endArrow}`}
      onClick={handleScroll}
      type="button"
    >
      {isStartArrow ? "<" : ">"}
    </button>
  );
  return (
    <>
      <div ref={detectorRef} className={styles.detector} />
      {scrollArrow}
    </>
  );
};

export default memo(DraftTrackerArrow);
