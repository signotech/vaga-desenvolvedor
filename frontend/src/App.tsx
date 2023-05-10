import { BrowserRouter } from 'react-router-dom';
import Routes from './config/routes';

import "materialize-css/dist/css/materialize.css"
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { ToastContainer } from 'react-toastify';
import "react-toast"
import { AuthProvider } from './contextApi/context/AuthContext';

const user = JSON.parse(`${localStorage.getItem("user_logged")}`)

if(user) {
  Axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`
} else {
  window.location.replace("/auth/signIn")
}

if(window.location.pathname === "/" && user) window.location.replace("/produtos")

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
