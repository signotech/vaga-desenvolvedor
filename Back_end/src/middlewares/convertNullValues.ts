import { NextFunction, Request, Response } from "express";
import Products from "../../models/productsModel";
import Order from "../../models/productsOrderModel";
import {
   TProductResponse,
   TProductUpdateRequest,
} from "../interfaces/products/products.interfaces";
import {
   TOrderRequest,
   TOrderResponse,
   TOrderUpdateRequest,
} from "../interfaces/order/order.interfaces";
import Client from "../../models/clientsModel";
import {
   TClienetupdateRequest,
   TClientResponse,
} from "../interfaces/clientInterface/client.interface";

const convertNullValues = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const routPath: string = req.baseUrl;

   const Id: number = parseInt(req.params.id);

   if (routPath == "/products") {
      const getProducts: TProductResponse = await Products.findByPk(Id);

      const dataBody: TProductUpdateRequest = req.body;

      const { price_product, stock_product, title_product } = getProducts;

      if (dataBody.price_product == null) {
         req.body.price_product = price_product;
      }

      if (dataBody.stock_product == null) {
         req.body.stock_product = stock_product;
      }
      if (dataBody.title_product == null) {
         req.body.title_product = title_product;
      }
   }

   if (routPath == "/order") {
      const getOrder: TOrderResponse = await Order.findByPk(Id);

      const dataBody: TOrderUpdateRequest = req.body;

      const { request_status } = getOrder;

      if (dataBody.request_status == null) {
         req.body.request_status = request_status;
      }
   }

   if (routPath == "/client") {
      const getClient: TClientResponse = await Client.findByPk(Id);

      const dataBody: TClienetupdateRequest = req.body;

      const { cpf_client, email_client, name_client } = getClient;

      if (dataBody.name_client == null) {
         req.body.name_client = name_client;
      }

      if (dataBody.cpf_client == null) {
         req.body.cpf_client = cpf_client;
      }
      if (dataBody.email_client == null) {
         req.body.email_client = email_client;
      }
   }

   return next();
};

export default convertNullValues;
