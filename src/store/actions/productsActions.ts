// Action Types
import { Product } from '../../models/Product';
import { Action } from '../../models/Action';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

// Action Creators
export const deleteProduct = (product: Product): Action => {

    return {
        type: DELETE_PRODUCT,
        payload: product
    }
}