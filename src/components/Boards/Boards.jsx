import { useState } from "react";
import Card from "./Card/Card";
import styles from "./styles.module.css";

function Boards({ initialListBoards }) {
  const [listBoards, setListBoards] = useState(initialListBoards);
  const [formBoard, setFormBoard] = useState({
    title: "",
    color: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormBoard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newboard = {
      title: formBoard.title,
      color: "hsl(10, 57%, 60%)"
    };
    setListBoards([...listBoards, newobject]);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>My Boards</h1>
          <div className={styles["container-filter"]}>
            <p className={styles["title-filter"]}>Sorty by</p>
            <select type="sele" className={styles["select-filter"]}>
              <option value="value1">Created date</option>
              <option value="value2">Alphabetic order</option>
            </select>
          </div>
        </div>
        {/* <button onClick={addBoards}>prueba add</button> */}
        <div className={styles.listCards}>
          <form className={styles["create-board"]}>
            <p className={styles["create-title"]}>Board Title</p>
            <input
              name="title"
              type="text"
              value={formBoard.title}
              onChange={handleChange}
              className={styles["create-input"]}
            />
            <div className={styles["create-buttons"]}>
              <button type="button">Color picker</button>
              <button className={styles["create-submit"]} type="submit">
                Create
              </button>
            </div>
          </form>
          {listBoards.map((board) => {
            return (
              <Card
                key={board.id}
                id={board.id}
                color={board.color}
                text={board.title}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Boards;
