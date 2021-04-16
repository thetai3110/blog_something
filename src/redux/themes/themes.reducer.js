import { ThemesTypes } from "./themes.types";

const INITIAL_STATE = {
    curentTheme: 'light'
}

export const themesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ThemesTypes.CHANGE_THEME: {
            return { ...state, curentTheme: action.payload }
        }
        default:
            return state;
    }
}