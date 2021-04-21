import { ThemesTypes } from "./themes.types";

const INITIAL_STATE = {
    currentTheme: 'light'
}

export const themesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ThemesTypes.CHANGE_THEME: {
            return { ...state, currentTheme: action.payload }
        }
        default:
            return state;
    }
}