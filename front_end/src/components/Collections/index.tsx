import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../contexts/order";
import { iOrders } from "../../contexts/order/@types";
import { ClientsContext } from "../../contexts/clients";
import { ProductsContext } from "../../contexts/products";
import { iClients } from "../../contexts/clients/@types";
import { iProducts } from "../../contexts/products/@types";
import OrderItems from "../itemsCollections/OrderItems";
import ClientItems from "../itemsCollections/ClientsItems";
import ProductItems from "../itemsCollections/ProductsItems";
import { DashboardPageContext } from "../../contexts/dashboardPage";
import Button from "@mui/material/Button";
import ModalCreateClient from "../modals/ModalCreateClient";
import ModalCreateOrder from "../modals/ModalCreateOrder";
import ModalCreateProduct from "../modals/ModalCreateProducts";
import { UlStyled } from "./styled";

const Collections = () => {
   const { getOrders, page, orders } = useContext(OrderContext);
   const { getClients, pageClients, clients,createClients } = useContext(ClientsContext);
   const { getProducts, products } = useContext(ProductsContext);
   const { selectList} = useContext(DashboardPageContext);

   const [opemModalCreate, setOpemModalCreate] = useState(false);
   const [opemModalOrder, setOpemModalOrder] = useState(false);
   const [opemModalProduct, setOpemModalProduct] = useState(false);
   
   
   useEffect(() => {

      if (selectList == "products") {
         getProducts();
      }
      if (selectList == "orders") {
         getOrders();
      }
      getClients()
      getOrders()
      getProducts();
   }, [page, pageClients, selectList]);

   return (
      <>
         <h2 className="Title Collections">Ultimos Pedidos</h2>
         <h3 className="Title Modal">Cadastrar</h3>

         <UlStyled className="collection with-header ">
            {selectList === "orders" && (
               <div>
                  <Button
                     onClick={() => setOpemModalOrder(!opemModalOrder)}
                     size="medium"
                     variant="contained"
                     sx={{ width: "25%" }}
                  >
                     Pedido
                  </Button>
                  {orders.map((order: iOrders) => (
                     <OrderItems key={order.id} order={order} />
                  ))}
               </div>
            )}

            {selectList === "clients" && (
               <div>
                  <Button
                     onClick={() => setOpemModalCreate(!opemModalCreate)}
                     size="medium"
                     variant="contained"
                     sx={{ width: "25%" }}
                  >
                     Cliente
                  </Button>
                  {clients.map((client: iClients) => (
                     <ClientItems
                        key={client.id}
                        client={client}
                     />
                  ))}
               </div>
            )}

            {selectList === "products" && (
               <div>
                  <Button
                     onClick={() => setOpemModalProduct(!opemModalProduct)}
                     size="medium"
                     variant="contained"
                     sx={{ width: "25%" }}
                  >
                     Produto
                  </Button>
                  {products.map((product: iProducts) => (
                     <ProductItems key={product.id} product={product} />
                  ))}
               </div>
            )}
         </UlStyled>

         {opemModalCreate && (
            <ModalCreateClient
               opemModalCreate={opemModalCreate}
               setOpemModalCreate={setOpemModalCreate}
            />
         )}
         {opemModalOrder && (
            <ModalCreateOrder
               opemModalOrder={opemModalOrder}
               setOpemModalOrder={setOpemModalOrder}
            />
         )}

         {opemModalProduct && (
            <ModalCreateProduct
               opemModalProduct={opemModalProduct}
               setOpemModalProduct={setOpemModalProduct}
            />
         )}

      </>
   );
};

export default Collections;
