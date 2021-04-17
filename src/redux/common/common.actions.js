import { CommonTypes } from "./common.types";

export const setLoading = isLoading => ({
    type: CommonTypes.SET_LOADING,
    payload: isLoading
})
export const setHideMyselfButton = (hidden) => ({
    type: CommonTypes.HIDDEN_MYSELF_BUTTON,
    payload: hidden
})