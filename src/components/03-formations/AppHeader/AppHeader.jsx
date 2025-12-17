import Logo from "../../01-composites/Logo/Logo.jsx";
import styles from "./AppHeader.module.scss";
import AppNav from "../../01-composites/AppNav/AppNav.jsx";

export default function AppHeader() {
  return (
      <header className={styles.header}>
        <Logo />
        <AppNav />
      </header>
  )
}
