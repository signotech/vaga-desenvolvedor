import VagaForm from "./Partials/VagaForm";

export default function Create(props) {
    const auth = props.auth
    return (
        <VagaForm auth={auth}/>
    )
}