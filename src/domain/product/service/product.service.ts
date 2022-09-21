import Product from '../entity/product';
export default class ProductService{
    public static increasePrice(products: Product[],percent: number): Product[]{
        products.forEach(product =>{
            product.changePrice(product.price + (product.price*percent)/100)
        })
        return products;
    }
}