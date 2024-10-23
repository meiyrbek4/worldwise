import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
import Button from "./Button";
function Sidebar({ isSidebar, setIsSidebar }) {
  return (
    <div className={`${styles.sidebar} ${!isSidebar ? styles.mobile : ""}`}>
      <Logo />
      <AppNav />

      <Outlet />
      <footer className={styles.footer}>
        <Button type="mobileBack" onClick={() => setIsSidebar(false)}>
          Hide Sidebar
        </Button>
      </footer>
    </div>
  );
}

export default Sidebar;
