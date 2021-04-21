import { CommonTypes } from "./common.types";

const INITIAL_STATE = {
    hiddenMyselfButton: true,
    pageName: ''
}

export const commonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CommonTypes.HIDDEN_MYSELF_BUTTON: {
            return { ...state, hiddenMyselfButton: action.payload }
        }
        case CommonTypes.SET_PAGE_NAME: {
            return { ...state, pageName: action.payload }
        }
        default:
            return state;
    }
}