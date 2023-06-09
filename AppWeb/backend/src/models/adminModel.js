const Adm = require('../sequelize/models/admin');

const getAdmByEmailAndPassword = async (email, senha) => {
  try {
    const adm = await Adm.findOne({
      where: {
        email: email,
        senha: senha
      }
    });
    return adm;
  } catch (error) {
    throw new Error(error.message);
  }
};

const existAdm = async(email)=>{
  try {
    const adm = await Adm.findOne({
      where: {
        email: email
       
      }
    });
    return adm;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addAdm = async (admData) => {
  try {
    const novoAdm = await Adm.create(admData);
    return novoAdm;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAdmById = async (id) => {
  try {
    const adm = await Adm.findByPk(id);
    return adm;
  } catch (error) {
    throw new Error(error.message);
  }
};




module.exports = {
  getAdmByEmailAndPassword,
  addAdm,
  existAdm,
  getAdmById
};
