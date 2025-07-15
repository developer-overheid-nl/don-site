import React from "react";
import clsx from "clsx";
import styles from './styles.module.css';

export type GridProps = {
  children: React.ReactNode;
  columns?: number;
  gap?: string;
  className?: string;
};

// Main Grid component that can embed other components
export default function Grid({
  children, 
  columns = 3, 
  gap = "1rem", 
  className 
}: GridProps): React.ReactNode {
  return (
    <div 
      className={clsx(styles.grid, className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap,
      }}
    >
      {children}
    </div>
  );
}
