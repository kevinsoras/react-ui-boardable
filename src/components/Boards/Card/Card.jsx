import styles from "./styles.module.css";

function Card({id=0,color="yellow",text="default"}){
  return (
    <>
    <div style={{backgroundColor:color}} className={styles.container}>
      {text}
    </div>
    </>
  )
}
export default Card