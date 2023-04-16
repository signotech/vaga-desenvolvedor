import useForm from "../hooks/useForm";
import ProductForm from "../components/ProductForm";
import productServices from "../services/productServices";
import Title from "../components/Title";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";
import { useLoaderData } from "react-router-dom";

export default function NewProduct() {
    const loadedData = useLoaderData();

    const [product, handleProductInput] = useForm(loadedData);

    async function saveChanges(formValues) {
        await productServices.updateProduct(formValues.id, formValues);
    }

    return(
        <> 
            <Title canGoBack>Editar produto</Title>
            <ProductForm shape={product} inputHandler={handleProductInput} active>
                <LoadingButton handler={() => saveChanges(product)}>
                    <Icon>save</Icon>
                    Salvar
                </LoadingButton>
            </ProductForm>
        </>
    )
}