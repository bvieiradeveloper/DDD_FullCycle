import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import OrderModel from './order.model';
import ProductModel from './product.model';

//Model extends from sequelize
@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel  extends Model{
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare productId: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare orderId: string;

  @BelongsTo(() => OrderModel)
  declare order: ProductModel;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}