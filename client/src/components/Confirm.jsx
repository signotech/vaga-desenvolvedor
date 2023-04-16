import LoadingButton from '../components/LoadingButton';

export default function Confirm(props) {

    function showModal() {
        return (
            <div className="modal-container">
                <div className="confirm-modal">
                    <div className='confirm-text'>
                        { props.children }
                    </div>
                    <div className='flex-side'>
                        <LoadingButton handler={() => {
                            props.confirmFunction();
                            props.closeModal();
                        }}>
                            Confirmar
                        </LoadingButton>
                        <button 
                        className="col s12 m6 btn red lighten-1 waves-light" 
                        type="submit"
                        onClick={props.closeModal}
                    > 
                        Cancelar
                    </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        props.toggler && showModal()
    )
}