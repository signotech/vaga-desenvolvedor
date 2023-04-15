import { useEffect, useRef } from "react"
import M from  'materialize-css/dist/js/materialize.min.js';

export default function Select(props) {
    const selectRef = useRef('select');

    useEffect(() => {
        M.FormSelect.init(selectRef.current);
    })

    function getOptions(curOption) {
        return (
            <option value={curOption[props.idIndicator]}>
                <span className="truncate">{ curOption[props.nameIndicator] }</span>
            </option>
        )
    }

    return (
        <select onChange={props.handleSelect} ref={selectRef} required>
            <option value="" disabled selected>Selecione o produto</option>
            { (props.options || []).map(getOptions) }
        </select>
    )
}