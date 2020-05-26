import { Action } from '../../models/Action';
import { AuthenticationState } from '../../models/AuthenticationState';
import {
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    SIGN_UP, SIGN_UP_ERROR,
    SIGN_UP_SUCCESS
} from '../actions/authenticationActions';

const initialState: AuthenticationState = {
    isLoading: false,
    error: '',
    token: '',
    userId: '',
    isLogged: false
}

export const authenticationReducer = (state: AuthenticationState = initialState, action: Action) => {

    switch (action.type) {

        case LOGIN:
            return {
                ...state,
                isLoading: true
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                token: action.payload.idToken,
                userId: action.payload.localId,
                isLogged: true
            };

        case LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case SIGN_UP:
            return {
                ...state,
                isLoading: true
            };

        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                token: action.payload.idToken,
                isLogged: true
            };

        case SIGN_UP_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }

}