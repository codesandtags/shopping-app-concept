import { CartState } from '../../models/CartState';
import { Action } from '../../models/Action';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';
import { Product } from '../../models/Product';
import { CartItemModel } from '../../models/CartItemModel';
import { ADD_ORDER } from '../actions/ordersActions';
import { DELETE_PRODUCT } from '../actions/productsActions';

const initialState: CartState = {
    items: {},
    totalAmount: 0
}

export const cartReducer = (state: CartState = initialState, action: Action) => {

    switch (action.type) {

        case ADD_TO_CART:
            const addedProduct: Product = action.payload;

            if (state.items[addedProduct.id]) {
                const updatedItem: CartItemModel = {
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
                const cartItem: CartItemModel = {
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

        case REMOVE_FROM_CART:
            const currentQuantity = state.items[action.payload.productId].quantity;
            const updatedProducts = {...state.items};
            const currentProduct = updatedProducts[action.payload.productId];
            const updatedTotalAmount = state.totalAmount - currentProduct.productPrice;

            if (currentQuantity > 1) {
                currentProduct.quantity = currentProduct.quantity - 1;
                currentProduct.sum = currentProduct.sum - currentProduct.productPrice;
            } else {
                delete updatedProducts[action.payload.productId];
            }

            return {
                totalAmount: updatedTotalAmount,
                items: {...updatedProducts}
            }

        case ADD_ORDER:
            return initialState;

        case DELETE_PRODUCT:
            const product = action.payload;
            if (!state.items[product.id]) {
                return state;
            } else {
                const updatedProducts = {...state.items};
                const itemTotal = updatedProducts[product.id].sum;
                delete updatedProducts[product.id];

                return {
                    ...state,
                    items: {...updatedProducts},
                    totalAmount: state.totalAmount - itemTotal
                };
            }

        default:
            return state;
    }

}