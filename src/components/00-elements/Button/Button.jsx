import styles from "./Button.module.scss";

export default function Button({ children, onClick, type, ariaLabel }) {
  return (
    <button
        onClick={onClick}
        className={`${styles.btn} ${styles[type]}`}
        aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
