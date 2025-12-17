import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import AppHeader from "../AppHeader/AppHeader.jsx";
import Main from "../Main/Main.jsx";
import AppFooter from "../AppFooter/AppFooter";

function Sidebar() {
  return (
      <div className={styles.sidebar}>
        <AppHeader/>
        <Main>
          <Outlet/>
        </Main>
        <AppFooter/>
      </div>
  )
}

export default Sidebar;
