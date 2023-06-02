import Products from '../../../models/productsModel';

   const deleteProductsService = async (clientId:number):Promise<void> => {

      const getProducts = await Products.findByPk(clientId);

      await getProducts.destroy()

   }

export default deleteProductsService