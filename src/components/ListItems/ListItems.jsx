import { useState } from "react";
import Options from "../Options/Options";
import styles from "./styles.module.css";
import Item from "./Item.jsx/Item";
import { createBoardCard } from "../../services/BoardCard.service";

function ListItems({listDetails,handleDeleteListDetail }) {
  const [add, setAdd] = useState(true);
  const [listCards,setListCards]=useState(listDetails)
  const handleCreateCard = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // Crear un objeto FormData con el formulario
    const title = formData.get("title");
    //
    try {
      const createdCard = await createBoardCard(listDetails.id, { title });
      const addCard = {
        id: createdCard.id,
        title: createdCard.title,
        orders: listCards.cards.length+1,
      };
      const newListCards = {...listCards};
      newListCards.cards=[...newListCards.cards,addCard]
      setListCards(newListCards);
      setAdd(true)
    } catch (error) {
      console.log(error);
    }
    event.target.reset();
  };
  const handleOptions = async (option)=>{
    console.log(option)
    if(option=="delete") await handleDeleteListDetail(listDetails.id)

  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles["box-title"]}>
          <input value={listCards.title} className={styles.title} />
          <Options handleEvent={handleOptions}></Options>
        </div>
        <div className={styles["list-card"]}>
          {listCards.cards.map((card) => {
            return <Item key={card.id} card={card}></Item>;
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
