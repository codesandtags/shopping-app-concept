// Action Types
import { Product } from '../../models/Product';
import { Action } from '../../models/Action';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

// Action Creators
export const fetchProducts = () => {
    return async (dispatch: Function) => {
        const url = 'https://shopping-app-concept.firebaseio.com/products.json';
        const response = await fetch(url, {});
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
    }
};

export const deleteProduct = (product: Product): Action => {

    return {
        type: DELETE_PRODUCT,
        payload: product
    }
}

export const createProduct = (product: Product) => {
    return async (dispatch: Function) => {
        const url = 'https://shopping-app-concept.firebaseio.com/products.json';
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
            payload: { ...product, id: data.name}
        });
    }
}

export const updateProduct = (product: Product): Action => {

    return {
        type: UPDATE_PRODUCT,
        payload: product
    }
}