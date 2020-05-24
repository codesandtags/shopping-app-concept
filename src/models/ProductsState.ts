import { CartState } from './CartState';
import { OrdersState } from './OrdersState';

export interface ProductsState {
    availableProducts: any[];
    userProducts: any[];
    isLoading: boolean;
    error: string;
}

export interface RootState {
    products: ProductsState,
    cart: CartState,
    orders: OrdersState
}