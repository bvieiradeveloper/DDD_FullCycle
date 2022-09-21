export default class Product{
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number){
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
          throw new Error("Id is required");
        }
        if (this._name.length === 0) {
          throw new Error("Name is required");
        }
        if (this._price <=  0) {
            throw new Error("Price must be greater than zero");
        }
    }

    public changeName(newName: string): void{
        this._name = newName;
        this.validate();
    }
    get name(): string {
        return this._name;
    }

    public changePrice(newPrice: number): void{
        this._price = newPrice;
        this.validate();
    }
    get price(): number {
        return this._price;
    }

    get id(): string {
        return this._id;
    }
} 