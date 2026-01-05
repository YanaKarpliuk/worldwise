import styles from "./Spinner.module.scss";

export default function Spinner({full}) {
  return (
      <div className={full ? styles.spinnerFull : ''}>
        <div className={styles.spinner}></div>
      </div>
  );
}
