// Action Types
import { Product } from '../../models/Product';
import { Action } from '../../models/Action';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// Action Creators
export const deleteProduct = (product: Product): Action => {

    return {
        type: DELETE_PRODUCT,
        payload: product
    }
}

export const createProduct = (product: Product): Action => {
    return {
        type: CREATE_PRODUCT,
        payload: product
    }
}

export const updateProduct = (product: Product): Action => {

    return {
        type: UPDATE_PRODUCT,
        payload: product
    }
}