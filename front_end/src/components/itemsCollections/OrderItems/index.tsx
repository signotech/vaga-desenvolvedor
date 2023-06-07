import { useContext, useState } from "react";
import { ClientsContext } from "../../../contexts/clients";
import { iOrders } from "../../../contexts/order/@types";
import { ButtonItems } from "../../../styles/buttons";
import { LiStyled } from "./styled";
import { iClients } from "../../../contexts/clients/@types";
import { ProductsContext } from "../../../contexts/products";
import { iProducts } from "../../../contexts/products/@types";
import ModalDelete from "../../modals/modalDelete";
import { OrderContext } from "../../../contexts/order";
import ModalEdit from "../../modals/modalEdit";

interface iorderProps {
   order: iOrders;
}
const OrderItems = ({ order }: iorderProps) => {
   const { clients } = useContext(ClientsContext);
   const { products } = useContext(ProductsContext);
   const { deleteOrders } = useContext(OrderContext);

   const [opemModal, setOpemModal] = useState(false);
   const [opemModalEdit, setOpemModalEdit] = useState(false);

   const { request_code, id, request_status, request_date, client_id } = order;

   const client = clients.find((client: iClients) => client.id === client_id);

   const productList = products.find(
      (product: iProducts) => product.product_order_id === order.id
   );

   return (
      <>
         
         <LiStyled className="collection-item grey lighten-3">
            <div>
               <p>
                  <span>Cliente: </span>
                  {client?.name_client}
               </p>
               <p>
                  <span>Produto: </span>
                  {productList?.title_product}
               </p>
               <p>
                  <span>Preço: </span>
                  {productList?.price_product}
               </p>
               <p>
                  <span>Codigo: </span>
                  {request_code}
               </p>
               <p>
                  <span>Data: </span>
                  {request_date}
               </p>
               <p>
                  <span>Status: </span>
                  {request_status}
               </p>
            </div>
            <button>
               <i
                  className="material-icons"
                  onClick={() => setOpemModal(!opemModal)}
               >
                  delete_forever
               </i>
            </button>
            <button>
               <i
                  className="material-icons icon__edit"
                  onClick={() => setOpemModalEdit(!opemModalEdit)}
               >
                  edit
               </i>
            </button>
            <ButtonItems>Mais infomações</ButtonItems>
         </LiStyled>

         {opemModal && (
            <ModalDelete
               opemModal={opemModal}
               setOpemModal={setOpemModal}
               id={id}
               requestDelete={deleteOrders}
            />
         )}
         {opemModalEdit && (
            <ModalEdit
               opemModalEdit={opemModalEdit}
               setOpemModalEdit={setOpemModalEdit}
               id={id}
            />
         )}
      </>
   );
};

export default OrderItems;
