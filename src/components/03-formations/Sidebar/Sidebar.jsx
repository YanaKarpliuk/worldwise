import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import AppHeader from "../AppHeader/AppHeader.jsx";
import Main from "../Main/Main.jsx";
import AppFooter from "../AppFooter/AppFooter";

export default function Sidebar() {
  return (
      <div className={styles.sidebar}>
        <AppHeader/>
        <Main full={false}>
          <Outlet/>
        </Main>
        <AppFooter/>
      </div>
  )
}
