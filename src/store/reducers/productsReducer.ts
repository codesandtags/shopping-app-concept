import { Action } from '../../models/Action';
import PRODUCTS from '../../../mocks/products';
import { ProductsState } from '../../models/ProductsState';
import { DELETE_PRODUCT } from '../actions/productsActions';
import { Product } from '../../models/Product';

const initialState: ProductsState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

export const productsReducer = (state: ProductsState = initialState, action: Action) => {
    switch (action.type) {

        case DELETE_PRODUCT:
            console.log('Removing product ', action.payload);
            return {
                ...state,
                userProducts: state.userProducts.filter((product: Product) => product.id !== action.payload.id)
            }

        default:
            return state;
    }
}