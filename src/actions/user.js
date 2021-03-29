export const requestSignupAction = (data) => {
    return {
        type: "REQUEST_SIGNUP",
        payload: data
    }
}
export const googleSignup = (data) => {
    return {
        type: "GOOGLE_SIGNUP",
        payload: data
    }
}
export const logout = () => {
    return {
        type: "LOGOUT"
    }
}