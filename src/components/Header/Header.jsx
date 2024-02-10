import styles from "./styles.module.css"
import svg from "../../assets/login-icon.svg"
function Header() {
  return (
    <>
      <header className={styles.container}>
      <div className={styles['container-items']}>
        <div className={styles['container-logo']}>
        <img className={styles.logo} src={svg} /> 
        <h1 className={styles.title}>Boardable</h1>
        </div>
        <div className={styles['container-buttons']}>
          <button className={styles['button-account']}>My Account</button>
          <button className={styles['button-logout']}>Logout</button>
        </div>

      </div>
      </header>
    </>
  );
}
export default Header;
