import { Sequelize } from "sequelize";

const sequelize = new Sequelize("teste", "postgres", "docker", {
    host: "signoweb-db",
    dialect: "postgres"
})

try{
    sequelize.authenticate()
}catch(err){
    console.log("Não foi possível conectar: ", err)
}

export default sequelize