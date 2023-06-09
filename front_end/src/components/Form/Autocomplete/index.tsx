import { useContext, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { UseFormRegisterReturn } from "react-hook-form";
import { iClients } from "../../../contexts/clients/@types";
import { ClientsContext } from "../../../contexts/clients";

interface iPropsParams {
   register: UseFormRegisterReturn;
   data: iClients[];
}

const Autocompletes = ({ register, data }: iPropsParams) => {

   const [value, setValue] = useState(null);
   
   const handleChange = (event: any, newValue: any) => {
      setValue(newValue);
   };

   return (
      <Autocomplete
         options={data}
         getOptionLabel={(data) => data.name_client}
         value={value|| null}
         isOptionEqualToValue={(option, value) => option.id === value.id}
         onChange={handleChange}
         renderInput={(params) => (
            <TextField
               {...params}
               label="Selecione um cliente"
               variant="outlined"
               required={true}
               {...register}
            />
         )}
      />
   );
};

export default Autocompletes;
