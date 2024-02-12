import Options from "../../Options/Options";
import styles from "./styles.module.css";

function Item({handleDeleteBoardCard,card}) {
  const handleOptions = async (option) => {
    console.log(option);
    if (option == "delete") await handleDeleteBoardCard(card.id);
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
