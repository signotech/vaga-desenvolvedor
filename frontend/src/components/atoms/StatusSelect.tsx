import { SelectHTMLAttributes } from "react"

export const StatusSelect:React.FC<SelectHTMLAttributes<HTMLSelectElement>> = ({...rest}) => {

    return (
        <select {...rest} className="bg-gray-200 rounded-lg p-2 w-full lg:w-auto">
            <option value={0}>Filtrar por status:</option>
            <option value={1}>ABERTO</option>
            <option value={2}>PAGO</option>
            <option value={3}>CANCELADO</option>
        </select>
    )

}