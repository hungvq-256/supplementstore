export const fetchProducts = () => {
    return {
        type: 'FETCH_PRODUCTS',
    }
}
export const fetchProductsSuccess = (products) => {
    return {
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: products
    }
}
export const fetchProductsFail = (message) => {
    return {
        type: 'FETCH_PRODUCTS_FAIL',
        payload: message
    }
}
export const removeProduct = (id) => {
    return {
        type: 'REMOVE_PRODUCT',
        payload: id
    }
}
export const addProduct = (product) => {
    return {
        type: 'ADD_PRODUCT',
        payload: product
    }
}
export const editProduct = (product) => {
    return {
        type: 'EDIT_PRODUCT',
        payload: product
    }
}
