import { UserTypes } from "./user.types"

export const setCurrentUSer = user => ({
    type: UserTypes.SET_CURRENT_USER,
    payload: user
})