import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface{
    async create(entity: Product): Promise<void> {
       
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,

        });
    }
    async update(entity: Product): Promise<void> {
        await ProductModel.update({
            id: entity.id,
            name: entity.name,
            price: entity.price,

        },{
            where:{id:entity.id}
        });
    }
    async find(id: string): Promise<Product> {
       const result = await ProductModel.findOne({ where:{ id : id}}).then(response =>{
             return new Product(response.id, response.name, response.price);
       });

       return result;
    }
    async findAll(): Promise<Product[]> {
        const results = await ProductModel.findAll()
        return results.map(result=>{
            return new Product(result.id, result.name, result.price);
        });
    }
    
}