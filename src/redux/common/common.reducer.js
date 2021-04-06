import { CommonTypes } from "./common.types";

const INITIAL_STATE = {
    isLoading: true,
}

export const commonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CommonTypes.SET_LOADING: {
            return { ...state, isLoading: action.payload }
        }
        default:
            return state;
    }
}