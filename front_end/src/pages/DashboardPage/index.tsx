import { useContext, useEffect } from "react";
import Collections from "../../components/Collections";
import NavBarDashboard from "../../components/Header/NavBarDashboard";
import { OrderContext } from "../../contexts/order";
import { ClientsContext } from "../../contexts/clients";
import { ProductsContext } from "../../contexts/products";
import Paginatio from "../../components/Paginatio";
import { DashboardPageContext } from "../../contexts/dashboardPage";


const DashboardPage = () => {
   const { getOrders, page } = useContext(OrderContext);
   const { getClients, pageClients,setClients} = useContext(ClientsContext);
   const { getProducts } = useContext(ProductsContext);
   const {selectList} = useContext(DashboardPageContext)

   useEffect(() => {

      if (selectList == 'products') {
         getProducts()
      }
      if(selectList == 'clients'){
         getClients()
      }
      getClients();
      getOrders();
      getProducts();
   }, [page, pageClients, selectList,setClients]);

   return (
      <>
         <header>
            <NavBarDashboard />
         </header>
         <main className="container max-width-1200">
            <Collections />
            <Paginatio />
         </main>
      </>
   );
};

export default DashboardPage;
