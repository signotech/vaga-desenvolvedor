import useForm from "../hooks/useForm";
import CustomerForm from "../components/CustomerForm";
import customerServices from "../services/customerServices";
import Title from "../components/Title";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";
import { useLoaderData } from "react-router-dom";

export default function SingleCustomer() {
    const loadedData = useLoaderData();

    const [customer, handleCustomerInput] = useForm(loadedData);

    async function saveChanges(formValues) {
        await customerServices.updateCustomer(formValues.id, formValues);
    }

    return(
        <> 
            <Title canGoBack>Editar cliente</Title>
            <CustomerForm shape={customer} inputHandler={handleCustomerInput} active>
                <LoadingButton handler={() => saveChanges(customer)}>
                    <Icon>save</Icon>
                    Salvar
                </LoadingButton>
            </CustomerForm>
        </>
    )
}