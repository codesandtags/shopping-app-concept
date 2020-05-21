export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems: object, totalAmount: number) => {
    return {
        type: ADD_ORDER,
        payload: {
            orderData: {
                items: cartItems,
                totalAmount
            }
        }
    }
};