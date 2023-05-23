import { ClientRepository } from "@implementation/repositories/ClientRepository";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { Container } from "inversify";
import { IManagerRepository } from "@domain/repositories/IManagerRepository";
import { ManagerRepository } from "@implementation/repositories/ManagerRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { ProductRepository } from "@implementation/repositories/ProductRepository";

const container = new Container()

container.bind<IClientRepository>("ClientRepository").to(ClientRepository)
container.bind<IManagerRepository>("ManagerRepository").to(ManagerRepository)
container.bind<IProductRepository>("ProductRepository").to(ProductRepository)

export {container}

