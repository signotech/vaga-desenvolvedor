import { SelectHTMLAttributes } from "react"

export const RecentSelect:React.FC<SelectHTMLAttributes<HTMLSelectElement>> = ({...rest}) => {

    return (
        <select {...rest} className="bg-gray-200 rounded-lg p-2 w-full lg:w-auto">
            <option value={0}>Organizar por data:</option>
            <option value={1}>Mais recentes</option>
            <option value={2}>Mais antigos</option>
        </select>
    )

}