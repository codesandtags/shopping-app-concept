// Action Types
import { Product } from '../../models/Product';
import { Action } from '../../models/Action';
import { API } from '../../constants/Api';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const FETCHING_PRODUCTS = 'FETCHING_PRODUCTS';
export const FETCHING_PRODUCTS_ERROR = 'FETCHING_PRODUCTS_ERROR';
export const UPDATE_PRODUCTS_ERROR = 'UPDATE_PRODUCTS_ERROR';
export const DELETE_PRODUCTS_ERROR = 'DELETE_PRODUCTS_ERROR';

// Action Creators
export const fetchProducts = () => async (dispatch: Function, getState: Function) => {
    dispatch({
        type: FETCHING_PRODUCTS,
        payload: null
    });

    console.log('And the state is...', getState());

    try {
        const token = getState().authentication.token;
        const url = API.PRODUCTS(token);
        const response = await fetch(url, {});

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        const products: Product[] = [];

        for (const key in data) {
            products.push({
                id: data[key].id,
                imageUrl: data[key].imageUrl,
                title: data[key].title,
                price: data[key].price,
                description: data[key].description,
                ownerId: data[key].ownerId
            })
        }

        dispatch({
            type: SET_PRODUCTS,
            payload: products
        })
    } catch (error) {
        console.log('Upsss error getting products...', error);
        dispatch({
            type: FETCHING_PRODUCTS_ERROR,
            payload: error.message
        });
    }
};

export const deleteProduct = (product: Product) => async (dispatch: Function, getState: Function) => {
    try {
        const token = getState().authentication.token;
        const url = API.UPDATE_PRODUCTS(product.id, token);
        console.log('Deleting this product ...', url);
        console.log('Width this data ...', product);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        console.log('data => ', data);

        dispatch({
            type: DELETE_PRODUCT,
            payload: {...product }
        });
    } catch (e) {
        console.log('Deleting products with error º', e);
        dispatch({
            type: UPDATE_PRODUCTS_ERROR,
            payload: e.message
        });
    }
}

export const createProduct = (product: Product) => {
    return async (dispatch: Function, getState: Function) => {
        const token = getState().authentication.token;
        const url = API.PRODUCTS(token);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        const data = await response.json();
        console.log('data => ', data);

        dispatch({
            type: CREATE_PRODUCT,
            payload: {...product, id: data.name}
        });
    }
}

export const updateProduct = (product: Product) => async (dispatch: Function, getState: Function) => {
    try {
        const token = getState().authentication.token;
        const url = API.UPDATE_PRODUCTS(product.id, token);
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        const data = await response.json();
        console.log('data => ', data);

        dispatch({
            type: UPDATE_PRODUCT,
            payload: {...product, id: data.name}
        });
    } catch (e) {
        console.log('Updating products with error º', e);
        dispatch({
            type: UPDATE_PRODUCTS_ERROR,
            payload: e.message
        });
    }
}