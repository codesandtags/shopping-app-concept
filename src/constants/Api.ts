export const API = {
    PRODUCTS: 'https://shopping-app-concept.firebaseio.com/products.json',
    UPDATE_PRODUCTS: (id: string) => `https://shopping-app-concept.firebaseio.com/products/${id}.json`,
    API_KEY: 'AIzaSyCKZq-Ml2b_6RWZCzlB4yoLDZ-v26T4wJI',
    SIGNUP: (apiKey: string) => `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    LOGIN: (apiKey: string) => `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
}