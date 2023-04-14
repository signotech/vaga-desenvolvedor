export default function TextInput(props) {
    return (
        <div className={`${props.className || ''}`}>
          <input 
            value={props.value} 
            onInput={props.handler} 
            placeholder={props.placeholder || ''} 
            name={props.name} 
            id={props.name} 
            type="text"
            minLength={props.minLength}
            maxLength={props.maxLength}
          />
          <label htmlFor={props.name}>{props.label}</label>
        </div>
    )
}