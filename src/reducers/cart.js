const initialStore = {
    cartList: [],
    totalPrice: 0,
    numberOfItem: 0,
    isOpenPopup: false
}

const cartReducer = (state = initialStore, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const newList = [...state.cartList];
            const newItem = { ...action.payload };
            let total = 0;
            let numberOfItem = 0;
            let flag = true;
            newList.forEach(item => {
                if (newItem.id === item.id) {
                    if (newItem.flavorChoosed) {
                        if (item.flavorChoosed === newItem.flavorChoosed) {
                            item.quantity += newItem.quantity;
                            flag = false;
                        }
                    } else {
                        item.quantity += newItem.quantity;
                        flag = false;
                    }
                }
            });
            if (flag) {
                newList.push(newItem);
            };
            newList.forEach(item => {
                total += Number(item.price) * Number(item.quantity);
                numberOfItem += Number(item.quantity);
            })
            localStorage.setItem('cart', JSON.stringify(newList));
            return {
                ...state,
                cartList: newList,
                totalPrice: total,
                numberOfItem: numberOfItem
            }
        }
        case "REMOVE_ITEM": {
            const index = action.payload;
            const newList = [...state.cartList];
            let total = 0;
            let numberOfItem = 0;
            newList.splice(index, 1);
            newList.forEach(item => {
                total += Number(item.price) * item.quantity;
                numberOfItem += item.quantity;
            })
            localStorage.setItem('cart', JSON.stringify(newList));
            return {
                ...state,
                cartList: newList,
                totalPrice: total,
                numberOfItem: numberOfItem
            }
        }
        case "INITIAL_LOAD_CART": {
            const loadList = action.payload;
            let total = 0;
            let numberOfItem = 0;
            loadList.forEach(item => {
                total += Number(item.price) * item.quantity;
                numberOfItem += item.quantity;
            })
            return {
                ...state,
                cartList: loadList,
                totalPrice: total,
                numberOfItem: numberOfItem,
            }

        }
        case "UPDATE_QUANTITY_ITEM": {
            const newList = [...state.cartList];
            const arrayHandle = action.payload;
            let total = 0;
            let numberOfItem = 0;
            newList.forEach((item, index) => {
                if (index === arrayHandle[0]) {
                    item.quantity += arrayHandle[1];
                    if (item.quantity === 0) item.quantity = 1;
                }
            });
            newList.forEach(item => {
                total += Number(item.price) * item.quantity;
                numberOfItem += item.quantity;
            })
            localStorage.setItem('cart', JSON.stringify(newList));
            return {
                ...state,
                cartList: newList,
                totalPrice: total,
                numberOfItem: numberOfItem,
            }
        }
        case "TRIGGER_PRODUCT_POPUP": {
            return {
                ...state,
                isOpenPopup: action.payload
            }
        }
        case "REMOVE_ALL_CART": {
            return {
                ...state,
                cartList: [],
                totalPrice: 0,
                numberOfItem: 0,
            }
        }
        default:
            return state;
    }
}

export default cartReducer;