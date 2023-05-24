import { ClientRepository } from "@implementation/repositories/ClientRepository";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { Container } from "inversify";
import { IManagerRepository } from "@domain/repositories/IManagerRepository";
import { ManagerRepository } from "@implementation/repositories/ManagerRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { ProductRepository } from "@implementation/repositories/ProductRepository";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { OrderRepository } from "@implementation/repositories/OrderRepository";
import { IOrderProductRepository } from "@domain/repositories/IOrderProductRepository";
import { OrderProductRepository } from "@implementation/repositories/OrderProductRepository";

const container = new Container()

container.bind<IClientRepository>("ClientRepository").to(ClientRepository)
container.bind<IManagerRepository>("ManagerRepository").to(ManagerRepository)
container.bind<IProductRepository>("ProductRepository").to(ProductRepository)
container.bind<IOrderRepository>("OrderRepository").to(OrderRepository)
container.bind<IOrderProductRepository>("OrderProductRepository").to(OrderProductRepository)

export {container}

