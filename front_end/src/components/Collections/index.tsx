import { useContext, useState } from "react";
import Items from "../itemsCollections";
import { OrderContext } from "../../contexts/order";
import { iOrders } from "../../contexts/order/@types";
import { UlStyled } from "./styled";


const Collections = () => {

   const {orders} = useContext(OrderContext)

   return (
      <UlStyled className="collection with-header ">
            <h2 className="Title Collections">Ultimos Pedidos</h2>
         {orders.map((order:iOrders) =>(<Items key={order.id} order={order}/>))}
      </UlStyled>
   );
};

export default Collections;
