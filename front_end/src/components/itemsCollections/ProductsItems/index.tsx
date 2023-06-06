import { ButtonItems } from "../../../styles/buttons";
import { LiStyled } from "./styled";
import ModalDelete from "../../modals/modalDelete";
import { useState } from "react";
import { iProducts } from "../../../contexts/products/@types";

interface iProductProps {
   product:iProducts ;
}
const ProductItems = ({ product }: iProductProps ) => {

   const [opemModal, setOpemModal] = useState(false);

   return (
      <>
         <LiStyled className="collection-item grey lighten-3">
            <div>
               <p>
                  <span>Produto: </span>
                  {product.title_product}
               </p>
               <p>
                  <span>SKU: </span>
                  {product.sku_product}
               </p>
               <p>
                  <span>Preço: </span>
                  {product.price_product}
               </p>
               <p>
                  <span>Estoque: </span>
                  {product.stock_product}
               </p>
               <p>
                  <span>Data de cadastro: </span>
                  {product.createdAt}
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
               id={product.id}
            />
         )}
      </>
   );
};

export default ProductItems;
