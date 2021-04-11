import { ThemesTypes } from "./themes.types";

export const changeTheme = theme => ({
    type: ThemesTypes.CHANGE_THEME,
    payload: theme
})