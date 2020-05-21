import { Action } from '../../models/Action';
import { ADD_ORDER } from '../actions/ordersActions';
import { Order } from '../../models/Order';
import { OrdersState } from '../../models/OrdersState';

const initialState: OrdersState = {
    orders: []
};

export const ordersReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ADD_ORDER:
            console.log('Receive order...', action.payload);
            const order: Order = {
                id: new Date().getTime().toString().substr(-3),
                items: [ ...action.payload.orderData.items],
                totalAmount: action.payload.orderData.totalAmount,
                date: new Date()
            };

            return {
                orders: state.orders.concat(order)
            };

        default:
            return state;
    }
};