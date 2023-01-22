import styles from "./Searchbar.module.scss";

export default function Searchbar({
  onClick,
  onChange,
}: {
  onClick: any;
  onChange: any;
}) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Drug Name"
        onChange={onChange}
      />
      <button className={styles.searchbutton} onClick={onClick}>
        Search
      </button>
    </div>
  );
}
