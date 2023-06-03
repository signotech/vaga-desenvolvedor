import { ToastContainer } from "react-toastify";
import { LoginProvider } from "./contexts/login";
import Router from "./routes";
import { GlobalTypography } from "./styles/Typography";
import { GlobalStyles } from "./styles/global";

export const App = () => (
   <>
      <GlobalStyles />
      <GlobalTypography />
      <LoginProvider>
         <Router />
      </LoginProvider>
      <ToastContainer
         position='top-center'
         autoClose={3500}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         draggable
         theme='dark'   
         />
   </>
);

export default App;
