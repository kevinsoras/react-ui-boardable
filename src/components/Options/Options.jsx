import { useState } from "react";
import OptionsSvg from "../../assets/options.svg";
import styles from "./styles.module.css";

function Options({handleEvent=()=>{}}) {
  const [showOptions, setShowOptions] = useState(false);
  function handleClick() {
    setShowOptions(!showOptions);
  }
  function handleButton(event){
    handleEvent(event)
    setShowOptions(false);
  }
  return (
    <>
      <div className={styles.wrapper}>
        <img
          onClick={handleClick}
          className={styles.icon}
          src={OptionsSvg}
        ></img>
        {showOptions && (
          <div className={styles.container}>
            <button onClick={()=>{handleButton("edit")}} className={styles.button}>Edit</button>
            <button onClick={()=>{handleButton("delete")}} className={styles.button}>Delete</button>
          </div>
        )}
      </div>
    </>
  );
}
export default Options;
