import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface iInputProps {
   id:string
   label: string;
   type: string;
   register: UseFormRegisterReturn;
   error: FieldError | undefined;
   
}

const Inputs = ({ id, label, type, register, error }: iInputProps) => {

   return (
      <fieldset>
         <div>
            <div>
               <input id={id} type={type} {...register} className="validate" />
               <label htmlFor={id}>{label}</label>
               {error ? <p>{error.message}</p> : null}
            </div>
         </div>
      </fieldset>
   );
};

export default Inputs;
