import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h1 className={styles.nav__title}>
          RX
          <span className={styles.nav__title__secondary}>ify</span>
        </h1>
      </nav>
    </div>
  );
}
