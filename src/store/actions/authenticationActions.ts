import { AsyncStorage } from 'react-native';

import { API } from '../../constants/Api';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

export const LOGOUT = 'LOGOUT';

export const AUTHENTICATE = 'AUTHENTICATE';

const getConfig = (username: string, password: string) => {
    return {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password: password,
            returnSecureToken: true
        })
    };
}

export const login = (username: string, password: string) => async (dispatch: Function) => {
    dispatch({
        type: LOGIN,
        payload: null
    });

    try {
        const url = API.LOGIN(API.API_KEY);
        const config = getConfig(username, password);
        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });
        const MILLISECONDS = 1000;
        const expirationDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * MILLISECONDS);
        saveDataToStorage(data.idToken, data.localId, expirationDate);
    } catch (e) {
        console.log('Uppsss', e);
        dispatch({
            type: LOGIN_ERROR,
            payload: 'Access denied. User or password are invalid'
        });
    }
}

export const signUp = (username: string, password: string) => async (dispatch: Function) => {
    dispatch({
        type: SIGN_UP,
        payload: null
    });

    try {
        const url = API.SIGNUP(API.API_KEY);
        const config = getConfig(username, password);
        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();

        dispatch({
            type: SIGN_UP_SUCCESS,
            payload: data
        })
    } catch (e) {
        console.log('Uppsss', e);
        dispatch({
            type: SIGN_UP_ERROR,
            payload: 'There is an error creating your account.'
        });
    }
}

export const logout = () => (dispatch: Function) => {
    AsyncStorage.clear();
    return dispatch({
        type: LOGOUT,
        payload: {}
    })
};

export const authenticate = (idToken: string, localId: string) => (dispatch: Function) => {
    return dispatch({
        type: AUTHENTICATE,
        payload: {
            idToken,
            localId
        }
    })
}

const saveDataToStorage = (idToken: string, userId: string, expirationDate: Date) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        idToken,
        userId,
        expirationDate: expirationDate.toISOString()
    }))
}