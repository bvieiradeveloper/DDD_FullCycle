import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({
    tableName: "customer",
    timestamps: false,
})
export default class CustomerModel extends Model{
    
    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false} )
    declare name: string;

    @Column({ allowNull: false} )
    declare street: string;

    @Column
    declare number: number;

    @Column({ allowNull: false} )
    declare zip: string;

    @Column({ allowNull: false} )
    declare city: string;


    @Column({ allowNull: false} )
    declare active: boolean

    
    @Column
    declare rewardPoints: number
}