export default function TextInput(props) {
    return (
        <div className={`input-field ${props.className || ''}`}>
          <input 
            value={props.value} 
            onInput={props.handler} 
            name={props.name} 
            id={props.name} 
            type={props.type || "text"}
            minLength={props.minLength}
            maxLength={props.maxLength}
            data-success={props.successText}
            data-error={props.errorText}
            required={props.required}
            disabled={props.disabled}
          />
          <label htmlFor={props.name}>{props.label}</label>
          {props.children}
        </div>
    )
}