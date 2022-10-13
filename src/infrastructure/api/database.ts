import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";

export async function setudpDb(){
  const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false
  })

  sequelize.addModels([CustomerModel])
  await sequelize.sync();

  return sequelize
}