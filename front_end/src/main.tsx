import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   
   <React.StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </React.StrictMode>
);
