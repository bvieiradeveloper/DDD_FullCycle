import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import CustomerModel from './customer.model';
import ItemModel from './order-item.model';

//Model extends from sequelize
@Table({
    tableName: "order",
    timestamps: false,
})
export default class OrderModel extends Model{
    
    @PrimaryKey
    @Column
    declare id: string;
  
    @ForeignKey(()=>CustomerModel)
    @Column({ allowNull: false} )
    declare customerId: string;

    @BelongsTo(()=>CustomerModel)
    declare customer: CustomerModel;


    @HasMany( () => ItemModel )
    declare items: ItemModel[];

    @Column({ allowNull: false} )
    declare total: number
}