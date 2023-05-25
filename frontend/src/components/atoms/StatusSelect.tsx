import { SelectHTMLAttributes } from "react"

export const StatusSelect: React.FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ ...rest }) => {

    return (
        <div className="flex items-center w-full lg:w-auto">
            <span className="bg-gray-300 rounded-l-lg w-full p-2">Status:</span>
            <select {...rest} className="bg-gray-200 w-full rounded-r-lg p-2 h-[40px]">
                <option value={0}>Todos</option>
                <option value={1}>ABERTO</option>
                <option value={2}>PAGO</option>
                <option value={3}>CANCELADO</option>

            </select>

        </div>

    )

}