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
    name: string
    desc: string
    img: string
    prices: number
    category: string
}

export interface cartItemType extends productType {
    subqty: number
    subtotal: number
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
    products: Array<cartItemType>,
    qty: number,
    total: number
}

export interface Iproducts {
    product: productType
}  

interface IAPIproduct {
    products: getProductType
}

export interface Icart {
    cart: CartState
}

interface Iorders {
    orders: Array<orderType>
  }