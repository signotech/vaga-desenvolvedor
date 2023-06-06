import { useContext, useEffect } from "react";
import Collections from "../../components/Collections";
import NavBarDashboard from "../../components/Header/NavBarDashboard";
import { OrderContext } from "../../contexts/order";
import { ClientsContext } from "../../contexts/clients";
import { ProductsContext } from "../../contexts/products";

const DashboardPage = () => {

   const {getOrders} = useContext(OrderContext)
   const {getClients} = useContext(ClientsContext)
   const {getProducts} = useContext(ProductsContext)
   
   useEffect(() => {
      getClients()
      getOrders()
      getProducts()
   }, []);

   return (
      <>
         <header>
            <NavBarDashboard/> 
         </header>

         <main className="container max-width-1200">
            <Collections/>
         </main>
      </>
   );
};

export default DashboardPage;
