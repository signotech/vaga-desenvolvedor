import useForm from "../hooks/useForm";
import ProductForm from "../components/ProductForm";
import { Product } from "../Shapes";
import productServices from "../services/productServices";

export default function NewProduct() {
    const [product, handleProductInput] = useForm(new Product());

    async function createProduct(formValues) {
        const createdProduct = await productServices.storeProduct(formValues);
        console.log(createdProduct);
    }

    return(
        <> 
            <p className="title">Adicionar produto</p>
            <ProductForm shape={product} inputHandler={handleProductInput} submitHandler={createProduct}>
                <button className="btn blue darken-1 waves-light" type="submit">Salvar
                    <i className="material-icons right">send</i>
                </button>
            </ProductForm>
        </>
    )
}