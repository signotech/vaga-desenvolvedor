import Products from "../../../models/productsModel";
import { AppError } from "../../error/error";


const deleteProductsService = async (
   bodyParams:any
): Promise<void> => {
   
   const { massDelete } = bodyParams;

   if (massDelete.length == 0) {
      throw new AppError("send id required", 404);
   }

   await Products.destroy({
      where: { id: massDelete },
   });
};

export default deleteProductsService;
