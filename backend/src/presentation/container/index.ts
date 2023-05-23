import { ClientRepository } from "@implementation/repositories/ClientRepository";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { Container } from "inversify";

const container = new Container()

container.bind<IClientRepository>("ClientRepository").to(ClientRepository)

export {container}

