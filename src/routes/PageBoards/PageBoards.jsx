/* eslint-disable react-hooks/rules-of-hooks */
import { authProvider } from "../../auth";
import { Header } from "../../components/";
import { redirect, useLoaderData,useNavigate } from "react-router-dom";
import { deleteBoard, getBoard, getBoardsListDetails } from "../../services/Boards.service";
import styles from "./styles.module.css";
import Options from "../../components/Options/Options";
import ListItems from "../../components/ListItems/ListItems";
import { Fragment, useState } from "react";
import { createListBoard, deleteBoardList } from "../../services/BoardList.service";

export async function loader({ request }) {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  //Traer data
  const url = new URL(request.url);
  const boardId = url.pathname.split("/")[2];
  console.log(boardId);
  //const listBoards = await getBoards()
  const [boards, boards_listDetails] = await Promise.all([
    getBoard(boardId),
    getBoardsListDetails(boardId),
  ]);

  return { boards, boards_listDetails };
}

function PageBoards() {
  const navigate = useNavigate();

  const { boards, boards_listDetails } = useLoaderData();
  const [boardsListDetails,setBoardsListDetails]=useState(boards_listDetails)

  const handleCreateListBoard = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // Crear un objeto FormData con el formulario
    const title = formData.get("title");
    //
    try {
      const listBoard = await createListBoard(boards.id, { title });
      const addListBoard={
        id:listBoard.id,
        title:listBoard.title,
        cards:[]
      }
      const new_boards_listDetails=[...boardsListDetails,addListBoard]
      console.log(new_boards_listDetails)
      setBoardsListDetails(new_boards_listDetails)
    } catch (error) {
      console.log(error);
    }
    event.target.reset();
  };
  const handleDeleteListDetail = async (listBoardId)=>{
    try {
      const deletedBoardList = await deleteBoardList(listBoardId);
      const newBoardListDetails=boardsListDetails.filter((listDetail)=>
        listDetail.id !=deletedBoardList.id
      )
      setBoardsListDetails(newBoardListDetails)
    } catch (error) {
      console.log(error);
    }
  }
  const handleOptions = async (option) => {
    if (option == "delete") await handleDeleteBoard(boards.id);
  };
  const handleDeleteBoard = async (boardId)=> {
    try {
      const deletedBoard = await deleteBoard(boardId);
      console.log(deletedBoard)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className={styles.section}>
        <Header />
        <div style={{ background: boards.color }} className={styles.container}>
          <div className={styles["box-contain"]}>
            <h1 className={styles.title}>{boards.title}</h1>
            <Options handleEvent={handleOptions}></Options>
          </div>
          <div className={styles["box-cards"]}>
            {boardsListDetails.map((listDetail, index) => {
              return (
                <Fragment key={listDetail.id}>
                  <ListItems handleDeleteListDetail={handleDeleteListDetail} listDetails={listDetail}></ListItems>
                  {index === 2 && (
                    <form
                      onSubmit={handleCreateListBoard}
                      className={styles["box-create"]}
                    >
                      <h1 className={styles["title-create"]}>List title</h1>
                      <input
                        name="title"
                        id="title"
                        className={styles["input-create"]}
                      ></input>
                      <button type="submit" className={styles["button-create"]}>
                        Create new list
                      </button>
                    </form>
                  )}
                </Fragment>
              );
            })}
            {
              boardsListDetails.length <= 2 && (
                <form
                      onSubmit={handleCreateListBoard}
                      className={styles["box-create"]}
                    >
                      <h1 className={styles["title-create"]}>List title</h1>
                      <input
                        name="title"
                        id="title"
                        className={styles["input-create"]}
                      ></input>
                      <button type="submit" className={styles["button-create"]}>
                        Create new list
                      </button>
                    </form>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
export default PageBoards;
