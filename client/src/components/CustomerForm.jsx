import TextInput from "./TextInput";
import Row from "./Row";

export default function CustomerForm(props) {
    return (
        <>
            <form className="col s12" onSubmit={(e) => {
                e.preventDefault();
                props.submitHandler && props.submitHandler(props.shape);
            }}>
                <Row>
                    <TextInput 
                        name='nome_cliente' 
                        className='col s12 m6'
                        label='Nome' 
                        value={props.shape.nome_cliente} 
                        handler={props.inputHandler}
                    />
                    <TextInput 
                        name='cpf_cliente' 
                        className='col s12 m6'
                        label='CPF' 
                        value={props.shape.cpf_cliente} 
                        handler={props.inputHandler}
                        minlength={11}
                        maxlength={11}
                    />
                </Row>
                <Row>
                    <TextInput 
                        name='email_cliente' 
                        className='col s12'
                        label='Email' 
                        value={props.shape.email_cliente} 
                        handler={props.inputHandler}
                    />
                </Row>
                {
                    props.children
                }
            </form>
        </>
    )
}