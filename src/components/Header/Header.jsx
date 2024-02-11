import styles from "./styles.module.css"
import svg from "../../assets/login-icon.svg"
import { useNavigate } from 'react-router-dom';
import { authProvider } from "../../auth";

function Header() {
  const navigate = useNavigate();

  const handleHomePage =()=>{
    navigate("/")
  }
  const handleLogout=()=>{
    authProvider.logout()
    navigate("/login")
  }
  return (
    <>
      <header className={styles.container}>
      <div className={styles['container-items']}>
        <div className={styles['container-logo']}>
        <img onClick={handleHomePage} className={styles.logo} src={svg} /> 
        <h1 onClick={handleHomePage} className={styles.title}>Boardable</h1>
        </div>
        <div className={styles['container-buttons']}>
          <button onClick={()=>{navigate("/account")}} className={styles['button-account']}>My Account</button>
          <button onClick={handleLogout} className={styles['button-logout']}>Logout</button>
        </div>
      </div>
      </header>
    </>
  );
}
export default Header;
