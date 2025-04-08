import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import UserAvatar from "../../entities/User/ui/UserAvatar";
import { User } from "../../entities/User/model/types";

interface GridLayoutProps {
  data: User[];
}

const GridLayout: React.FC<GridLayoutProps> = ({ data }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    const rect = scrollContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setIsDragging(true);
    setStartX(x);
    setStartScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current) return;
      const rect = scrollContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const walk = x - startX;
      scrollContainerRef.current.scrollLeft = startScrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, startScrollLeft]);

  const getGridPosition = (index: number): React.CSSProperties => {
    if (index === 0) return { gridArea: "1 / 1 / 3 / 3" };

    const adjustedIndex = index - 1;
    const col = Math.floor(adjustedIndex / 2) + 3;
    const row = (adjustedIndex % 2) + 1;

    return {
      gridArea: `${row} / ${col} / ${row + 1} / ${col + 1}`,
    };
  };

  return (
    <div
      ref={scrollContainerRef}
      className={styles.scrollContainer}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.parent}>
        {data.map((user, index) => (
          <div
            key={user.id + index}
            className={styles.gridItem}
            style={getGridPosition(index)}
          >
            <UserAvatar
              numberId={user.id}
              pathUrlImg={user.image}
              text={user.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridLayout;
