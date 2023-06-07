
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React, { useContext } from "react";
import FormEditProduct from "../../Form/FormEditProduct";
import FormEditClient from "../../Form/FormEditClient";
import FormEditOrder from "../../Form/FormEditOrder";
import { DashboardPageContext } from "../../../contexts/dashboardPage";

interface iModalProps{
   opemModalEdit:boolean
   setOpemModalEdit:React.Dispatch<React.SetStateAction<boolean>>
   id:number
}

const ModalEdit = ({opemModalEdit,setOpemModalEdit,id}:iModalProps) => {

   const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
         children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>
   ) {
      return <Slide direction="up" ref={ref} {...props} />;
   });


   const {selectList} = useContext(DashboardPageContext)


   const modalClose = () => {
      setOpemModalEdit(!opemModalEdit);
   };

   return (
      <>
         <Dialog
            open={opemModalEdit}
            TransitionComponent={Transition}
            keepMounted
            onClose={modalClose}
            aria-describedby="alert-dialog-slide-description"
         >

            {selectList === "orders" && <FormEditOrder id={id} modalClose={modalClose}/>}

            {selectList === "clients" && <FormEditClient id={id} modalClose={modalClose}/>}

            {selectList === "products" && <FormEditProduct id={id} modalClose={modalClose}/> }

         </Dialog>
      </>
   );
};

export default ModalEdit;
