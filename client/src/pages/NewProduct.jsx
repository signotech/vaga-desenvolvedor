import useForm from "../hooks/useForm";
import ProductForm from "../components/ProductForm";
import { Product } from "../Shapes";

export default function NewProduct() {

    return(
        <> 
            <p className="title">Adicionar produto</p>
            <ProductForm shape={new Product()}/>
        </>
    )
}