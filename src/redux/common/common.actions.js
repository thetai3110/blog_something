import { CommonTypes } from "./common.types";

export const setHideMyselfButton = (hidden) => ({
    type: CommonTypes.HIDDEN_MYSELF_BUTTON,
    payload: hidden
})
export const setPageName = (name) => ({
    type: CommonTypes.SET_PAGE_NAME,
    payload: name
})