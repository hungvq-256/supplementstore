const initialState = {
    current: {},
    loadingAvatar: true
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REQUEST_SIGNUP": {
            return {
                ...state,
                current: action.payload
            }
        }
        case "GOOGLE_SIGNUP": {
            return {
                ...state,
                current: action.payload
            }
        }
        case "UPDATE_USERINFO": {
            return {
                ...state,
                current: action.payload,
                loadingAvatar: false
            }
        }
        case "UPDATE_LOADINGAVATAR": {
            return {
                ...state,
                loadingAvatar: action.payload
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                current: {}
            }
        }
        default: {
            return { ...state };
        }
    }
}
export default userReducer;
