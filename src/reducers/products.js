const initialState = {
    listProducts: [],
    request: true,
    message: null,
    editProduct: {}
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS': {
            return {
                ...state,
                request: true
            }
        }
        case 'FETCH_PRODUCTS_SUCCESS': {
            let products = action.payload;
            return {
                ...state,
                listProducts: products,
                request: false
            }
        }
        case 'FETCH_PRODUCTS_FAIL': {
            return {
                ...state,
                request: false,
                message: action.payload
            }
        }
        case "REMOVE_PRODUCT": {
            let id = action.payload;
            let newListProducts = [...state.listProducts];
            const findIndex = (id, listProducts) => {
                let result = -1;
                for (let i = 0; i < listProducts.length; i++) {
                    if (listProducts[i].id === id) {
                        result = i;
                    }
                }
                return result;
            }
            newListProducts.splice(findIndex(id, newListProducts), 1);
            return {
                ...state,
                listProducts: newListProducts
            }
        }
        case 'ADD_PRODUCT': {
            let newProducts = [...state.listProducts];
            newProducts.push({ ...action.payload });
            alert('Successfully added new product')
            return {
                ...state,
                listProducts: newProducts
            }
        }
        case 'EDIT_PRODUCT': {
            let newListProduct = [...state.listProducts];
            let id = action.payload.id;
            const findIndex = (id, listProducts) => {
                let result = -1;
                for (let i = 0; i < listProducts.length; i++) {
                    if (listProducts[i].id === id) {
                        result = i;
                    }
                }
                return result;
            }
            newListProduct[findIndex(id, newListProduct)] = action.payload
            return {
                ...state,
                listProducts: newListProduct
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default productsReducer;