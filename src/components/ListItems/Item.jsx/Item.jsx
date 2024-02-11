import Options from "../../Options/Options";
import styles from "./styles.module.css";

function Item({card}) {
  const handleOptions = (option) => {
    console.log(option);
  };
  return (
    <>
      <div className={styles.container}>
        <input value={card.title} className={styles.title} />
        <Options handleEvent={handleOptions}></Options>
      </div>
    </>
  );
}
export default Item;
