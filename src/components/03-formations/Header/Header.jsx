import Logo from "../../01-composites/Logo/Logo.jsx";
import styles from "./Header.module.scss";
import PageNav from "../../01-composites/PageNav/PageNav.jsx";

export default function Header() {
  return (
      <header className={styles.header}>
        <div className="container">
          <Logo />
          <PageNav />
        </div>
      </header>
  )
}
