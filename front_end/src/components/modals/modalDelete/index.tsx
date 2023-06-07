
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { dataDelete } from "../../../contexts/order/@types";

interface imodalProps {
   opemModal:boolean
   setOpemModal:React.Dispatch<React.SetStateAction<boolean>>
   id:number
   requestDelete: (data: dataDelete) => Promise<void>
}

const ModalDelete = ({opemModal,setOpemModal,id,requestDelete}:imodalProps) => {

   const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
         children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>
   ) {
      return <Slide direction="up" ref={ref} {...props} />;
   });
   



   const handleClose = () => {
      setOpemModal(!opemModal);
   };

   const submitDelete = () =>{

      const data:dataDelete ={
         massDelete:id
      }

      requestDelete(data)

      setOpemModal(!opemModal)
   }

   return (
      <div>
         <Dialog
            open={opemModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
         >
            <DialogContent >
               <DialogContentText id="alert-dialog-slide-description" sx={{ fontWeight: 'bold',fontSize:"1.2rem",color: '#004182',}}>
                  Deseja mesmo deletar esse Pedido ? 
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} size="medium" variant="contained">Voltar</Button>
               <Button onClick={() => submitDelete()} color="error" size="medium" variant="contained">Deletar</Button>
            </DialogActions>
         </Dialog>
      </div>
   )
};

export default ModalDelete;
