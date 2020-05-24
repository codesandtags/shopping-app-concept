export const API = {
    PRODUCTS: 'https://shopping-app-concept.firebaseio.com/products.json',
    UPDATE_PRODUCTS: (id: string) => `https://shopping-app-concept.firebaseio.com/products/${id}.json`
}