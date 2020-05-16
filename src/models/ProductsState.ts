import { CartState } from './CartState';

export interface ProductsState {
    availableProducts: any[];
    userProducts: any[];
}

export interface RootState {
    products: ProductsState,
    cart: CartState
}