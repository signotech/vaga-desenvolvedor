import Products from "../../../models/productsModel";
import { AppError } from "../../error/error";
import { TdeleteSchema } from "../../interfaces/massDelete.interfaces";

const deleteProductsService = async (
   bodyParams: TdeleteSchema
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
