import { useContext, useState } from "react";
import { iOrders } from "../../../contexts/order/@types";
import { LiStyled } from "./styled";
import ModalDelete from "../../modals/ModalDelete";
import { OrderContext } from "../../../contexts/order";
import ModalEdit from "../../modals/ModalEdit";
import { ClientsContext } from "../../../contexts/clients";
import { iClients } from "../../../contexts/clients/@types";
import { ProductsContext } from "../../../contexts/products";
import { iProducts } from "../../../contexts/products/@types";

interface iorderProps {
   order: iOrders;
}
const OrderItems = ({ order }: iorderProps) => {

   const { deleteOrders } = useContext(OrderContext);

   const [opemModal, setOpemModal] = useState(false);
   const [opemModalEdit, setOpemModalEdit] = useState(false);

   const { clients } = useContext(ClientsContext);

   const { products } = useContext(ProductsContext);

   const { request_code, id, request_status, request_date } = order;

   const client = clients.find((client: iClients) => client.id == id);

   const product = products.find(
      (product: iProducts) => order.id == product.product_order_id
   );

   const formatDate = new Date(request_date).toLocaleDateString()
   return (
      <>
         <LiStyled className="collection-item grey lighten-3">
            <div>
               <p>
                  <span>cliente: </span>
                  {client?.name_client}
               </p>
               <p>
                  <span>Email: </span>
                  {client?.email_client}
               </p>
               <p>
                  <span>Produtos: </span>
                  {product?.title_product}
               </p>
               <p>
                  <span>Preço: </span>
                  {product?.price_product}
               </p>
               <p>
                  <span>Codigo: </span>
                  {request_code}
               </p>
               <p>
                  <span>Data: </span>
                  {formatDate}
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
