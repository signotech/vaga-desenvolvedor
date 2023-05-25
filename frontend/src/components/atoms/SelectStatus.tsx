import { SelectHTMLAttributes } from "react";

export const SelectStatus: React.FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ ...rest }) => {

    return (
        <select className='bg-gray-200 rounded-lg p-2 items-center lg:gap-2 w-full'>
            <option value={undefined}>Selecione o status</option>
            <option value={0}>ABERTO</option>
            <option value={0}>PAGO</option>
            <option value={0}>CANCELADO</option>
        </select>

    )

}