import useForm from "../hooks/useForm";
import customerServices from '../services/customerServices';
import CustomerForm from "../components/CustomerForm";
import { Customer } from "../Shapes";

export default function NewCustomer() {

    const [newCustomer, handleNewCustomerInput] = useForm(new Customer());

    async function createCustomer(formValues) {
        const createdCustomer = await customerServices.storeCustomer(formValues);
    }

    return(
        <> 
            <p className="title">Adicionar cliente</p>
            <CustomerForm 
                shape={newCustomer}
                inputHandler={handleNewCustomerInput}
                submitHandler={createCustomer}
            >
                <button className="btn blue darken-1 waves-light" type="submit">Salvar
                    <i className="material-icons right">send</i>
                </button>
            </CustomerForm>
        </>
    )
}