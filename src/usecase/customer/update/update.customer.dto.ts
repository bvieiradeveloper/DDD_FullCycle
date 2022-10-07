export interface InputUpdateCustomerUseCase{
    id: string,
    name: string,
    address:{
        street: string
        number: number
        city: string
        zip: string
    }
}

export interface OutputUpdateCustomerUseCase{
    id: string,
    name: string,
    address:{
        street: string
        number: number
        city: string
        zip: string
    }
}