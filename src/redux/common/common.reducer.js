import { CommonTypes } from "./common.types";

const INITIAL_STATE = {
    isLoading: true,
    hiddenMyselfButton: true,
}

export const commonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CommonTypes.SET_LOADING: {
            return { ...state, isLoading: action.payload }
        }
        case CommonTypes.HIDDEN_MYSELF_BUTTON: {
            return { ...state, hiddenMyselfButton: action.payload }
        }
        default:
            return state;
    }
}