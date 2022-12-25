declare global {
    var mongoose: any
}

export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
}

export interface productType {
    _id: number
    item: string
    name: string
    desc: string
    img: string
    prices: number
    category: string
}

export interface orderType {
    _id: number
    customer: string
    address: string
    total: number
    method: number
    status: number
}

export interface getProductType {
    success: boolean
    data: Array<productType>
}

// Define a type for the slice state
export interface CartState {
    products: Array<productType>,
    qty: number,
    total: number
}

export interface Iproducts {
    product: productType
}  

export interface Icart {
    cart: CartState
}