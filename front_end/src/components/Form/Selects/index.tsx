import { InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface iInputProps {
   id: string;
   label: string;
   labelId: string;
   register: UseFormRegisterReturn;
}

const Selects = ({ id, label, labelId, register }: iInputProps) => {
   const [value, setValue] = useState("");

   const handleChange = (event: {
      target: { value: React.SetStateAction<string> };
   }) => {
      setValue(event.target.value as string);
   };

   return (
      <>
         <InputLabel id={labelId}>{label}</InputLabel>
         <Select
            labelId={labelId}
            id={id}
            value={value}
            required={true}
            {...register}
            onChange={handleChange}
         >
            <MenuItem value="Em Aberto">Em Aberto</MenuItem>
            <MenuItem value="Pago">Pago</MenuItem>
            <MenuItem value="Cancelado">Cancelado</MenuItem>
         </Select>
      </>
   );
};

export default Selects;
