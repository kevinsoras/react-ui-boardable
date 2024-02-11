import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';

function Card({id=0,color="yellow",text="default"}){
  const navigate = useNavigate();
  return (
    <>
    <div onClick={()=>{navigate(`/boards/${id}`)}} style={{backgroundColor:color}} className={styles.container}>
      {text}
    </div>
    </>
  )
}
export default Card