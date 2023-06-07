import { useContext } from "react";
import { OrderContext } from "../../contexts/order";
import { iOrders } from "../../contexts/order/@types";
import { UlStyled } from "./styled";
import { ClientsContext } from "../../contexts/clients";
import { ProductsContext } from "../../contexts/products";
import { iClients } from "../../contexts/clients/@types";
import { iProducts } from "../../contexts/products/@types";
import OrderItems from "../itemsCollections/OrderItems";
import ClientItems from "../itemsCollections/ClientsItems";
import ProductItems from "../itemsCollections/ProductsItems";
import { DashboardPageContext } from "../../contexts/dashboardPage";

const Collections = () => {
   const { orders } = useContext(OrderContext);
   const { clients } = useContext(ClientsContext);
   const { products } = useContext(ProductsContext);
   const {selectList} = useContext(DashboardPageContext)

   return (
      <>
         <UlStyled className="collection with-header ">
            <h2 className="Title Collections">Ultimos Pedidos</h2>

            {selectList === "orders" && orders.map((order: iOrders) => (
               <OrderItems key={order.id} order={order} />
            ))}

            {selectList === "clients" && clients.map((client: iClients) => (
               <ClientItems key={client.id} client={client} />
            ))}

            {selectList === "products" && products.map((product: iProducts) => (
               <ProductItems key={product.id} product={product} />
            ))}

         </UlStyled>
      </>
   );
};

export default Collections;
