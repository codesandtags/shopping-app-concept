import { Product } from '../../models/Product';
import { Action } from '../../models/Action';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product: Product): Action => {

    return {
        type: ADD_TO_CART,
        payload: product
    }
}

export const removeFromCart = (item: any): Action => {

    return {
        type: REMOVE_FROM_CART,
        payload: item
    }
}