import Order from '../../../models/productsOrderModel';

   const deleteOrderService = async (orderId:number):Promise<void> => {

      const getOrder = await Order.findByPk(orderId);

      await getOrder.destroy()

   }

export default deleteOrderService