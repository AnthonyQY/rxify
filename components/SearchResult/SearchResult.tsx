import { useState } from "react";
import styles from "./SearchResult.module.scss";

export default function SearchResult({
  title,
  setState,
  rxcui,
  targetSet,
}: {
  title: string;
  targetSet: any;
  setState: any;
  rxcui: string;
}) {
  const handleResultButton = async () => {
    await targetSet(new Set([]));
    setState(rxcui);
  };
  return (
    <button className={styles.container} onClick={handleResultButton}>
      <h1 className={styles.resultTitle}>{title}</h1>
    </button>
  );
}
