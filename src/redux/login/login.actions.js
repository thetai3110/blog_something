import { LoginTypes } from "./login.types";

export const setError= err => ({
    type: LoginTypes.SET_ERROR,
    payload: err
})

export const setMessage = message => ({
    type: LoginTypes.SET_MESSAGE,
    payload: message
})