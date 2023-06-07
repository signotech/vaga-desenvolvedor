import { ButtonItems } from "../../../styles/buttons";
import { LiStyled } from "./styled";

import ModalDelete from "../../modals/modalDelete";
import { useContext, useState } from "react";
import { iClients } from "../../../contexts/clients/@types";
import { ClientsContext } from "../../../contexts/clients";

interface iClientProps {
   client:iClients ;
}
const ClientItems = ({ client }: iClientProps ) => {

   const [opemModal, setOpemModal] = useState(false);
   const { deleteClients } = useContext(ClientsContext);

   const {cpf_client,email_client,id,createdAt,name_client} = client
   return (
      <>
         <LiStyled className="collection-item grey lighten-3">
            <div>
               <p>
                  <span>Cliente: </span>
                  {name_client}
               </p>
               <p>
                  <span>Email: </span>
                  {email_client}
               </p>
               <p>
                  <span>CPF: </span>
                  {cpf_client}
               </p>
               <p>
                  <span>Data do cadastro: </span>
                  {createdAt}
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
               id={id}
               requestDelete={deleteClients}
            />
         )}
      </>
   );
};

export default ClientItems ;
