import TextInput from "./TextInput";
import Row from "./Row";

export default function OrderForm(props) {
    return (
        <>
            <form className="col s12" onSubmit={(e) => {
                e.preventDefault();
                props.submitHandler(props.shape);
            }}>
                <Row>
                    <TextInput 
                        name='status_pedido' 
                        className='col m6 s12'
                        label='Status' 
                        value={props.shape.status_pedido} 
                        handler={props.inputHandler}
                    />
                    <TextInput 
                        name='data_pedido' 
                        className='col m6 s12'
                        label='Data' 
                        value={props.shape.data_pedido} 
                        handler={props.inputHandler}
                    />
                </Row>
                <Row>
                    <TextInput 
                        name='valor_pedido' 
                        className='col s12'
                        label='Valor' 
                        value={props.shape.valor_pedido} 
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