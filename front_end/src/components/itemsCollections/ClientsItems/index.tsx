import { ButtonItems } from "../../../styles/buttons";
import { LiStyled } from "./styled";

import ModalDelete from "../../modals/modalDelete";
import { useState } from "react";
import { iClients } from "../../../contexts/clients/@types";

interface iClientProps {
   client:iClients ;
}
const ClientItems = ({ client }: iClientProps ) => {

   const [opemModal, setOpemModal] = useState(false);

   return (
      <>
         <LiStyled className="collection-item grey lighten-3">
            <div>
               <p>
                  <span>Cliente: </span>
                  {client?.name_client}
               </p>
               <p>
                  <span>CPF: </span>
                  {client.cpf_client}
               </p>
               <p>
                  <span>Preço: </span>
                  {client.email_client}
               </p>
               <p>
                  <span>Data do cadastro: </span>
                  {client.createdAt}
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

            <ButtonItems>Mais infomações</ButtonItems>
         </LiStyled>

         {opemModal && (
            <ModalDelete
               opemModal={opemModal}
               setOpemModal={setOpemModal}
               id={client.id}
            />
         )}
      </>
   );
};

export default ClientItems ;
