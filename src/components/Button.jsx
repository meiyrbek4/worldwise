import styles from "./Button.module.css";

function Button({ children, onClick, type, isLandscape = false }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]} ${
        isLandscape && styles.landscape
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
