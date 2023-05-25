import { SelectHTMLAttributes } from "react";

type SelectStatus = {
    register:any
} & SelectHTMLAttributes<HTMLSelectElement>

export const SelectStatus: React.FC<SelectStatus> = ({register, ...rest }) => {

    return (
        <select {...rest} {...register(rest.name, {valueAsNumber:true})} className='bg-gray-200 rounded-lg p-2 items-center lg:gap-2 w-full'>
            <option value={3}>Selecione o status</option>
            <option value={0}>ABERTO</option>
            <option value={1}>PAGO</option>
            <option value={2}>CANCELADO</option>
        </select>

    )

}