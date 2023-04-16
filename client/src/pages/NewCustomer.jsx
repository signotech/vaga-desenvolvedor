import useForm from "../hooks/useForm";
import customerServices from '../services/customerServices';
import CustomerForm from "../components/CustomerForm";
import { Customer } from "../Shapes";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";
import Title from "../components/Title";

export default function NewCustomer() {

    const [newCustomer, handleNewCustomerInput, clearCustomerForm] = useForm(new Customer());

    async function createCustomer(formValues) {
        await customerServices.storeCustomer(formValues);
        clearCustomerForm();
    }

    return(
        <> 
            <Title canGoBack>Adicionar cliente</Title>
            <CustomerForm 
                shape={newCustomer}
                inputHandler={handleNewCustomerInput}
            >
                <LoadingButton handler={() => createCustomer(newCustomer)}>
                    <Icon>save</Icon>
                    Salvar
                </LoadingButton>
            </CustomerForm>
        </>
    )
}