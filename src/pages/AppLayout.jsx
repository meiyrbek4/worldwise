import { useState } from "react";
import Map from "../components/Map";
import PopupMobile from "../components/PopupMobile";
import Sidebar from "../components/Sidebar";
import User from "../components/User";

import styles from "./AppLayout.module.css";

function AppLayout() {
  const [isSidebar, setIsSidebar] = useState(false);
  return (
    <div className={styles.app}>
      <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
      <Map />
      <User isSidebar={isSidebar} />
      <PopupMobile isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
    </div>
  );
}

export default AppLayout;
