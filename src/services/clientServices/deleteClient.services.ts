import Client from "../../../models/clientsModel";
import { AppError } from "../../error/error";
import { TdeleteSchema } from "../../interfaces/massDelete.interfaces";

const deleteClientService = async (
   bodyParams: TdeleteSchema
): Promise<void> => {
   
   const { massDelete } = bodyParams;

   if (massDelete.length == 0) {
      throw new AppError("send id required", 404);
   }

   await Client.destroy({
      where: { id: massDelete },
   });
};

export default deleteClientService;
