import { Action } from '../../models/Action';
import PRODUCTS from '../../../mocks/products';
import { ProductsState } from '../../models/ProductsState';

const initialState: ProductsState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

export const productsReducer = (state: ProductsState = initialState, action: Action) => {
    switch (action.type) {

        default:
            return state;
    }
}