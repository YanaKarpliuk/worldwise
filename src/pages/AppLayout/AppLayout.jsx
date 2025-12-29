import Sidebar from "../../components/03-formations/Sidebar/Sidebar.jsx";
import Map from "../../components/02-blocks/Map/Map";
import styles from "./AppLayout.module.scss"
import User from "../../components/01-composites/User/User.jsx";

export default function AppLayout() {
  return (
      <div className={styles.app}>
        <User/>
        <Sidebar />
        <Map/>
      </div>
  )
}
