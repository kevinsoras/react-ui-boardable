import { useState } from "react";
import Options from "../Options/Options";
import styles from "./styles.module.css";
import Item from "./Item.jsx/Item";

function ListItems({ listDetails }) {
  const [add, setAdd] = useState(true);

  const handleCreateCard = async (event) => {
    event.preventDefault();

    event.target.reset();
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles["box-title"]}>
          <input value={listDetails.title} className={styles.title} />
          <Options></Options>
        </div>
        <div className={styles['list-card']}>
          {listDetails.cards.map((card) => {
            return <Item  key={card.id} card={card}></Item>;
          })}
        </div>
        <div className={styles["box-add"]}>
          {add && (
            <button
              className={styles["button-add"]}
              onClick={() => setAdd(false)}
            >
              + Add cart
            </button>
          )}
          {!add && (
            <form onSubmit={handleCreateCard} className={styles["box-create"]}>
              <h1 className={styles["title-create"]}>Card Title</h1>
              <input
                name="title"
                id="title"
                className={styles["input-create"]}
              ></input>
              <div style={{ display: "flex", gap: "8px" }}>
                <button type="submit" className={styles["button-create"]}>
                  Add Card
                </button>
                <button
                  type="button"
                  onClick={() => setAdd(true)}
                  className={styles["button-cancel"]}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
export default ListItems;
