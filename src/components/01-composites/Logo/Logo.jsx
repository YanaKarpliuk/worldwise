import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

function Logo() {
  return (
      <div className={styles.logoWrapper}>
        <Link to='/'>
          <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
        </Link>
      </div>
  )
}

export default Logo;
