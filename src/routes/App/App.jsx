import {
  redirect
} from "react-router-dom";
import { authProvider } from '../../auth';
import './App.css';

export async function loader({ request }) {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  //Traer data
  return {}
}

function App() {
  
  return (
    <>
      <div>
       Principal
      </div>
      
    </>
  )
}

export default App
