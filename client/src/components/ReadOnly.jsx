import TextInput from "./TextInput";

export default function ReadOnly(props) {
    return (
        <TextInput value={props.value || props.defaultValue || '0.00'} disabled>
            <span class="helper-text">{ props.text }</span>
        </TextInput>
    )
}