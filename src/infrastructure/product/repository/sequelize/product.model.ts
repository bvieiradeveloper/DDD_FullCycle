import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

//Model extends from sequelize
@Table({
    tableName: "products",
    timestamps: false,
})
export default class ProductModel extends Model{
    
    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false} )
    declare name: string;

    @Column({ allowNull: false} )
    declare price: number
}