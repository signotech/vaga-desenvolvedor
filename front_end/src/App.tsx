import { ToastContainer } from "react-toastify";
import { LoginProvider } from "./contexts/login";
import Router from "./routes";
import { GlobalTypography } from "./styles/Typography";
import { GlobalStyles } from "./styles/global";
import { ClientsProvide } from "./contexts/clients";
import { OrderProvide } from "./contexts/order";
import { ProductsProvide } from "./contexts/products";

export const App = () => (
   <>
      <GlobalStyles />
      <GlobalTypography />
      <LoginProvider>
         <ClientsProvide>
            <OrderProvide>
               <ProductsProvide>
                  <Router />
               </ProductsProvide>
            </OrderProvide>
         </ClientsProvide>
      </LoginProvider>
      <ToastContainer
         position="top-center"
         autoClose={3500}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         draggable
         theme="dark"
      />
   </>
);

export default App;
