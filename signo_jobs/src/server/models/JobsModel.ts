import { Model, DataTypes } from "sequelize";
import { postgresSequelize } from "../config/postgres";
import { Job } from "@/interfaces/Job";

class JobsModel extends Model<Job> {}

JobsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.STRING, allowNull: true },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["CLT", "PJ", "FREELANCER"]],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["PAUSED", "JOB"]],
      },
    },
    candidates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    tableName: "jobs",
    timestamps: false,
    sequelize: postgresSequelize,
  }
);

export default JobsModel;
