export const addToCart = (item) => {
    return {
        type: "ADD_TO_CART",
        payload: item
    }
}
export const updateQuantityItem = (arraydata) => {
    return {
        type: "UPDATE_QUANTITY_ITEM",
        payload: arraydata
    }
}
export const removeItem = (index) => {
    return {
        type: "REMOVE_ITEM",
        payload: index
    }
}
export const initialLoadCart = (cartList) => {
    return {
        type: "INITIAL_LOAD_CART",
        payload: cartList
    }
}
export const triggerProductPopup = (boolean) => {
    return {
        type: "TRIGGER_PRODUCT_POPUP",
        payload: boolean
    }
}
export const removeAllCart = () => {
    return {
        type: "REMOVE_ALL_CART",
    }
}
