import fs from "node:fs";
import path from "node:path";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { fileURLToPath } from "node:url";

const artifactRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const storage =
  process.env.PURCHASE_ORDERS_DB_STORAGE ??
  path.resolve(artifactRoot, "data", "purchase-orders.sqlite");
fs.mkdirSync(path.dirname(storage), { recursive: true });

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: false,
});

export class Customer extends Model<
  InferAttributes<Customer>,
  InferCreationAttributes<Customer>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare cpf: string;
  declare email: string;
  declare phone: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare orders?: NonAttribute<PurchaseOrder[]>;
}

Customer.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    cpf: { type: DataTypes.STRING(14), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(30), allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "customers",
    timestamps: true,
    underscored: true,
  },
);

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare sku: string;
  declare title: string;
  declare price: number;
  declare stock: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare orderItems?: NonAttribute<OrderItem[]>;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sku: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    title: { type: DataTypes.STRING(100), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "products",
    timestamps: true,
    underscored: true,
  },
);

export type OrderStatus = "open" | "paid" | "canceled";

export class PurchaseOrder extends Model<
  InferAttributes<PurchaseOrder>,
  InferCreationAttributes<PurchaseOrder>
> {
  declare id: CreationOptional<number>;
  declare customerId: number;
  declare orderDate: Date;
  declare status: OrderStatus;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare customer?: NonAttribute<Customer>;
  declare items?: NonAttribute<OrderItem[]>;
}

PurchaseOrder.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "customers", key: "id" },
    },
    orderDate: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: "open",
      validate: { isIn: [["open", "paid", "canceled"]] },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "purchase_orders",
    timestamps: true,
    underscored: true,
  },
);

export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  declare id: CreationOptional<number>;
  declare orderId: number;
  declare productId: number;
  declare quantity: number;
  declare unitPrice: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare product?: NonAttribute<Product>;
}

OrderItem.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unitPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "order_items",
    timestamps: true,
    underscored: true,
  },
);

Customer.hasMany(PurchaseOrder, { foreignKey: "customerId", as: "orders" });
PurchaseOrder.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
PurchaseOrder.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "items",
  onDelete: "CASCADE",
});
OrderItem.belongsTo(PurchaseOrder, { foreignKey: "orderId", as: "order" });
Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
