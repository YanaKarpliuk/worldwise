import Logo from "./Logo";
import styles from "./Header.module.scss";
import PageNav from "./PageNav";

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
