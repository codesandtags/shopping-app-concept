import { CartState } from '../../models/CartState';
import { Action } from '../../models/Action';
import { ADD_TO_CART } from '../actions/cartActions';
import { Product } from '../../models/Product';
import { CartItem } from '../../models/CartItem';

const initialState: CartState = {
    items: {},
    totalAmount: 0
}

export const cartReducer = (state: CartState = initialState, action: Action) => {

    switch (action.type) {

        case ADD_TO_CART:
            const addedProduct: Product = action.payload;

            if (state.items[addedProduct.id]) {
                const updatedItem: CartItem = {
                    quantity: state.items[addedProduct.id].quantity + 1,
                    productTitle: addedProduct.title,
                    productPrice: addedProduct.price,
                    sum: state.items[addedProduct.id].sum + addedProduct.price
                }

                return {
                    totalAmount: state.totalAmount + updatedItem.productPrice,
                    items: {
                        ...state.items,
                        [addedProduct.id]: {
                            ...updatedItem
                        }
                    }
                }

            } else {
                const cartItem: CartItem = {
                    quantity: 1,
                    productTitle: addedProduct.title,
                    productPrice: addedProduct.price,
                    sum: addedProduct.price
                }

                return {
                    totalAmount: state.totalAmount + cartItem.productPrice,
                    items: {
                        ...state.items,
                        [addedProduct.id]: {
                            ...cartItem
                        }
                    }
                }
            }

        default:
            return state;
    }

}