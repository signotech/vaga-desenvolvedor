import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface iInputProps {
   id: string;
   label: string;
   type: string;
   register: UseFormRegisterReturn;
   error: FieldError | undefined;
}

const Inputs = ({ id, label, type, register, error }: iInputProps) => {

   return (
      <fieldset>
         <div className="row " >
            <label htmlFor={id} className="label">{label}</label>
            <input id={id} type={type} {...register} className="validate" />
            {error ? <p>{error.message}</p> : null}
         </div>
      </fieldset>
   );
};

export default Inputs;
