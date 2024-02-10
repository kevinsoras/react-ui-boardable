import { redirect,useLoaderData } from "react-router-dom";
import { authProvider } from "../../auth";
import "./App.css";
import Header from "../../components/Header/Header";

import styles from "./styles.module.css";
import Boards from "../../components/Boards/Boards";
import { getBoards } from "../../services/Boards.service";

export async function loader({ request }) {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  //Traer data
  const listBoards = await getBoards()
  return {listBoards};
}

function App() {
  const { listBoards } = useLoaderData();
  return (
    <>
      <Header />
      <div className={styles.section}>
        <div className={styles.container}>
        <Boards initialListBoards={listBoards}/>
        </div>
      </div>
    </>
  );
}

export default App;
