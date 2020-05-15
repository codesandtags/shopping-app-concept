export interface ProductsState {
    availableProducts: any[]
    userProducts: any[]
}

export interface RootState {
    products: ProductsState
}