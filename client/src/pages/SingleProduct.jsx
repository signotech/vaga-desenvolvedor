import useForm from "../hooks/useForm";
import ProductForm from "../components/ProductForm";
import { Product } from "../Shapes";
import productServices from "../services/productServices";
import Title from "../components/Title";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";

export default function NewProduct() {
    const [product, handleProductInput] = useForm(new Product());

    async function createProduct(formValues) {
        await productServices.storeProduct(formValues);
    }

    return(
        <> 
            <Title canGoBack>Adicionar produto</Title>
            <ProductForm shape={product} inputHandler={handleProductInput}>
                <LoadingButton handler={() => createProduct(product)}>
                    <Icon>save</Icon>
                    Salvar
                </LoadingButton>
            </ProductForm>
        </>
    )
}