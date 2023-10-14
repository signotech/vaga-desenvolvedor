import { Model, DataTypes } from "sequelize";
import { postgresSequelize } from "../config/postgres";
import { User } from "@/interfaces/User";

class UserModel extends Model<User> {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    jobs: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["USER", "ADMIN"]],
      },
    },
  },
  {
    tableName: "users",
    timestamps: false,
    sequelize: postgresSequelize,
  }
);

export default UserModel;
