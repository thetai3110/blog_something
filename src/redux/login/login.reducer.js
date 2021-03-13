import { LoginTypes } from "./login.types"

const INITIAL_STATE = {
    error: '',
    message: ''
}

export const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LoginTypes.SET_ERROR: {
            return { ...state, error: action.payload }
        }
        case LoginTypes.SET_MESSAGE: {
            return { ...state, message: action.payload }
        }
        default:
            return state;
    }
}