import Sidebar from "../../components/03-formations/Sidebar/Sidebar.jsx";
import Map from "../../components/02-blocks/Map/Map";
import styles from "./AppLayout.module.scss"

export default function AppLayout() {
  return (
      <div className={styles.app}>
        <Sidebar />
        <Map/>
      </div>
  )
}
