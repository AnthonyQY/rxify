import styles from "./AnaylsisView.module.scss";

export default function AnalysisView({
  rxname,
  rxcui,
  interactions,
}: {
  rxname: string;
  rxuid: string;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.stack}>
        <h1 className={styles.drug__name}>{rxname}</h1>
        <h2 className={styles.drug__rxcui}>rxcui: {rxcui}</h2>
        <h2 className={styles.drug__interactions}>INTERACTIONS</h2>
        <p>{interactions}</p>
      </div>
    </div>
  );
}
