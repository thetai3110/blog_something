import { CommonTypes } from "./common.types";

export const setLoading = isLoading => ({
    type: CommonTypes.SET_LOADING,
    payload: isLoading
})