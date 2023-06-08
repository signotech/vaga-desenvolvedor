import { useContext, useState } from "react";
import { iOrders } from "../../../contexts/order/@types";
import { ButtonItems } from "../../../styles/buttons";
import { LiStyled } from "./styled";
import ModalDelete from "../../modals/ModalDelete";
import { OrderContext } from "../../../contexts/order";
import ModalEdit from "../../modals/ModalEdit";

interface iorderProps {
   order: iOrders;
}
const OrderItems = ({ order }: iorderProps) => {
   const { deleteOrders } = useContext(OrderContext);

   const [opemModal, setOpemModal] = useState(false);
   const [opemModalEdit, setOpemModalEdit] = useState(false);

   const { request_code, id, request_status, request_date } = order;

   return (
      <>
         <LiStyled className="collection-item grey lighten-3">
            <div>
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
