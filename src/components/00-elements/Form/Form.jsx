import styles from "./Form.module.scss";

export default function Form({ isLoading, handleSubmit, children }) {
  return (
      <form
          className={`${styles.form} ${isLoading ? styles.loading : ""}`}
          onSubmit={handleSubmit}
      >
        {children}
      </form>
  );
}
