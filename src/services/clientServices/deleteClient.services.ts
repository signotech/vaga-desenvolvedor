import Client from '../../../models/clientsModel'

   const deleteClientService = async (clientId:number):Promise<void> => {

      const getClient = await Client.findByPk(clientId);

      await getClient.destroy()

   }

export default deleteClientService