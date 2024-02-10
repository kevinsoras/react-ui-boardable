import { useEffect, useState } from "react";
import Card from "./Card/Card";
import styles from "./styles.module.css";
import { createBoard, getBoards } from "../../services/Boards.service";
import ColorPicker from "../ColorPicker/ColorPicker";

function Boards({ initialListBoards }) {
  const [listBoards, setListBoards] = useState(initialListBoards);
  const [formBoard, setFormBoard] = useState({
    title: "",
    color: "#E2E8F0",
  });
  const [sortChose, setSortChose] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormBoard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmitBoard = async (event) => {
    event.preventDefault();
    const newboard = {
      title: formBoard.title,
      color: formBoard.color,
    };
    try {
      const createdBoard = await createBoard(newboard);
      setFormBoard({ title: "", color: "#E2E8F0" });
      setListBoards([...listBoards, createdBoard]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function handleSortyBoard() {
      console.log("entra")
      let sortyBy = sortChose;
      let order = "desc";
      if (sortyBy == "titleAsc") {
        sortyBy = "title";
        order = "asc";
      }
      if (sortyBy == "titleDesc") {
        sortyBy = "title";
        order = "desc";
      }
      try {
        const sortListBoards = await getBoards(sortyBy, order);
        setListBoards(sortListBoards);
      } catch (error) {
        console.log(error);
      }
    }
    if (sortChose != "") handleSortyBoard();
  }, [sortChose]);
  const handleOptionClick = (value) => {
    setSortChose(value);
  };
  return (
    <>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>My Boards</h1>
          <div className={styles["container-filter"]}>
            <p className={styles["title-filter"]}>Sorty by</p>
            <select
              onClick={(e) => handleOptionClick(e.target.value)}
              type="sele"
              className={styles["select-filter"]}
            >
              <option value="createdAt">Created date</option>
              <option value="titleAsc">Alphabetic order A-Z</option>
              <option value="titleDesc">Alphabetic order Z-A</option>
            </select>
          </div>
        </div>
        {/* <button onClick={addBoards}>prueba add</button> */}
        <div className={styles.listCards}>
          <form
            style={{ backgroundColor: formBoard.color }}
            onSubmit={handleSubmitBoard}
            className={styles["create-board"]}
          >
            <p className={styles["create-title"]}>Board Title</p>
            <input
              name="title"
              type="text"
              required
              value={formBoard.title}
              onChange={handleChange}
              className={styles["create-input"]}
            />
            <div className={styles["create-buttons"]}>
              <div className={styles["color-picker-box"]}>
                <p>Color:</p>
                <ColorPicker name="color" onChange={handleChange}></ColorPicker>
              </div>
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
