import { CartState } from './CartState';
import { OrdersState } from './OrdersState';

export interface ProductsState {
    availableProducts: any[];
    userProducts: any[];
}

export interface RootState {
    products: ProductsState,
    cart: CartState,
    orders: OrdersState
}