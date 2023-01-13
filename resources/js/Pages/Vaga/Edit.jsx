import VagaForm from './Partials/VagaForm';

export default function Create(props) {
    const vaga = props.vaga
    const auth = props.auth

    return (
       <VagaForm vaga={vaga} auth={auth}/>
    );
}
