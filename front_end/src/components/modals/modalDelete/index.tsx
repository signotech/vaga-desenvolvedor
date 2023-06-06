
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useContext} from "react";
import { OrderContext } from "../../../contexts/order";
import React from "react";
import { dataDelete } from "../../../contexts/order/@types";

interface imodalProps {
   opemModal:boolean
   setOpemModal:React.Dispatch<React.SetStateAction<boolean>>
   id:number
}

const ModalDelete = ({opemModal,setOpemModal,id}:imodalProps) => {

   const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
         children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>
   ) {
      return <Slide direction="up" ref={ref} {...props} />;
   });
   

   const {deleteOrders} = useContext(OrderContext)


   const handleClose = () => {
      setOpemModal(!opemModal);
   };

   const submitDelete = () =>{

      const data:dataDelete ={
         massDelete:id
      }

      deleteOrders(data)

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
