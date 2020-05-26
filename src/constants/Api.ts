export const API = {
    API_KEY: 'AIzaSyCKZq-Ml2b_6RWZCzlB4yoLDZ-v26T4wJI',
    PRODUCTS: (token: string) => `https://shopping-app-concept.firebaseio.com/products.json?auth=${token}`,
    UPDATE_PRODUCTS: (id: string, token:string) => `https://shopping-app-concept.firebaseio.com/products/${id}.json?auth=${token}`,
    SIGNUP: (apiKey: string) => `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    LOGIN: (apiKey: string) => `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
}