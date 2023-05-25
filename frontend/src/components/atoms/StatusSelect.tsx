import { SelectHTMLAttributes } from "react"

export const StatusSelect: React.FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ ...rest }) => {

    return (
        <div className="flex items-center w-full lg:w-auto">
            <span className="bg-gray-300 rounded-l-lg w-full p-2">Status:</span>
            <select {...rest} className="bg-gray-200 w-full rounded-r-lg p-2 h-[40px]">
                <option value={''}>Todos</option>
                <option value={"ABERTO"}>ABERTO</option>
                <option value={"PAGO"}>PAGO</option>
                <option value={"CANCELADO"}>CANCELADO</option>

            </select>

        </div>

    )

}