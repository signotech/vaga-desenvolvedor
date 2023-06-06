import { useContext, useEffect, useState } from "react";
import { ClientsContext } from "../../contexts/clients";
import { OrderContext } from "../../contexts/order";

const Paginatio = () => {
   const [currentPage, setCurrentPage] = useState(1);

   const { setPageClients } = useContext(ClientsContext);
   const { setPage } = useContext(OrderContext);

      useEffect(() => {

         if (currentPage > 0) {
            const convert:string = currentPage.toString()
            
            setPageClients(convert)
   
            setPage(convert)
         }

      }, [currentPage, setPage, setPageClients]);

   return (
      <ul className="pagination">
         <li className={currentPage == 1 ? "disabled" : ""}>
            <a href="#!" onClick={() => setCurrentPage(currentPage - 1 ) } >
               <i className="material-icons">chevron_left</i>
            </a>
         </li>
         <li className={currentPage == 1 ? "active" : "waves-effect"}>
            <a href="#!" onClick={() => setCurrentPage(1)}>
               1
            </a>
         </li>
         <li className={currentPage == 2 ? "active" : "waves-effect"}>
            <a href="#!" onClick={() => setCurrentPage(2)}>
               2
            </a>
         </li>
         <li className={currentPage == 3 ? "active" : "waves-effect"}>
            <a href="#!" onClick={() => setCurrentPage(3)}>
               3
            </a>
         </li>
         <li className={currentPage == 4 ? "active" : "waves-effect"}>
            <a href="#!" onClick={() => setCurrentPage(4)}>
               4
            </a>
         </li>

         <li className="waves-effect">
            <a href="#!" onClick={() => setCurrentPage(currentPage + 1)}>
               <i className="material-icons">chevron_right</i>
            </a>
         </li>
      </ul>
   );
};

export default Paginatio;
