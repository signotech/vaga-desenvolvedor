import useForm from "../hooks/useForm";
import ProductForm from "../components/ProductForm";
import { Product } from "../Shapes";

export default function NewProduct() {

    return(
        <> 
            <p className="title">Adicionar produto</p>
            <ProductForm shape={new Product()}>
                <button className="btn blue darken-1 waves-light" type="submit">Salvar
                    <i className="material-icons right">send</i>
                </button>
            </ProductForm>
        </>
    )
}