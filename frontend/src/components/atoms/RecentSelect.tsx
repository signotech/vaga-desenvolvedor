import { SelectHTMLAttributes } from "react"

export const RecentSelect: React.FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ ...rest }) => {

    return (
        <div className="flex items-center w-full lg:w-auto">
            <span className="bg-gray-300 rounded-l-lg p-2 w-full">Ordenar por:</span>
            <select {...rest} className="bg-gray-200 w-full rounded-r-lg p-2 h-[40px]">
                <option value={1}>Mais recentes</option>
                <option value={2}>Mais antigos</option>
            </select>

        </div>
    )

}