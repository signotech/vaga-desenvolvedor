import { useContext } from "react";
import { ClientsContext } from "../../contexts/clients";
import { iOrders } from "../../contexts/order/@types";
import { ButtonItems } from "../../styles/buttons";
import { LiStyled } from "./styled";
import { iClients } from "../../contexts/clients/@types";
import { ProductsContext } from "../../contexts/products";
import { iProducts } from "../../contexts/products/@types";

interface iorderProps{
   order:iOrders
}
const Items = ({order}:iorderProps) => {

   const {clients} = useContext(ClientsContext)
   const {products} = useContext(ProductsContext)

   const client = clients.find((client:iClients) => client.id === order.client_id);
   const productList = products.find((product:iProducts) => product.product_order_id === order.id)


   return (
      <LiStyled className="collection-item grey lighten-3">
         <div>
            <p>
               <span>Cliente: </span>{client?.name_client}
            </p>
            <p>
               <span>Produto: </span>{productList?.title_product}
            </p>
            <p>
               <span>Preço: </span>{productList?.price_product}
            </p>
            <p>
               <span>Codigo: </span>{order.request_code}
            </p>
            <p>
               <span>Data: </span> {order.request_date}
            </p>
            <p>
               <span>Status: </span>{order.request_status}
            </p>
         </div>

         <ButtonItems >Mais infomações</ButtonItems>
      </LiStyled>
   );
};

export default Items;
