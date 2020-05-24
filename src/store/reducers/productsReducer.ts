import { Action } from '../../models/Action';
import PRODUCTS from '../../../mocks/products';
import { ProductsState } from '../../models/ProductsState';
import {
    CREATE_PRODUCT,
    DELETE_PRODUCT, FETCHING_PRODUCTS, FETCHING_PRODUCTS_ERROR,
    SET_PRODUCTS,
    UPDATE_PRODUCT
} from '../actions/productsActions';
import { Product } from '../../models/Product';

const initialState: ProductsState = {
    availableProducts: [],
    userProducts: [],
    isLoading: false,
    error: ''
}

export const productsReducer = (state: ProductsState = initialState, action: Action) => {
    switch (action.type) {

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter((product: Product) => product.id !== action.payload.id)
            }

        case CREATE_PRODUCT:
            const product = {
                ...action.payload,
                id: 'p' + new Date().getTime().toString().substr(-3),
                ownerId: 'u2'
            };

            return {
                ...state,
                availableProducts: state.availableProducts.concat(product),
                userProducts: state.userProducts.concat(product)
            };

        case UPDATE_PRODUCT:
            const updatedProducts = [...state.availableProducts];
            const updatedUserProducts = [...state.userProducts];
            const productIndex = state
                .availableProducts.findIndex(product => product.id === action.payload.id);
            const userProductIndex = state
                .userProducts.findIndex(product => product.id === action.payload.id);

            updatedProducts[productIndex] = { ...action.payload };
            updatedUserProducts[userProductIndex] = { ...action.payload };

            return {
                ...state,
                availableProducts: [...updatedProducts],
                userProducts: [...updatedUserProducts]
            };

        case FETCHING_PRODUCTS:
            console.log('Getting products...');
            return  {
                ...state,
                isLoading: true,
                error: ''
            }

        case FETCHING_PRODUCTS_ERROR:
            return  {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case SET_PRODUCTS:
            return {
                availableProducts: [...action.payload],
                userProducts: action.payload.filter((product:Product) => product.ownerId === 'u1'),
                isLoading: false
            }

        default:
            return state;
    }
}