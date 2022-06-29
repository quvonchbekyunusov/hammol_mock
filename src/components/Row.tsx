import React from "react";
import styles from "./Row.module.scss";

interface RowProps {
  children: React.ReactNode;
}

function Row({ children }: RowProps) {
  return <div className={styles.row}>{children}</div>;
}

export default Row;
