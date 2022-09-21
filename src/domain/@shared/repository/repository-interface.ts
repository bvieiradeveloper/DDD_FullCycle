export default interface RepositoryInterface<T>{
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    find(id: string): Promise<T>;
    findAll():Promise<T[]>; //it is good pratice retuns some metadata like pagination, offset, next and last page numbers;
}