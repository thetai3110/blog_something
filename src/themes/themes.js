import React from "react";
import styled from 'styled-components';
import { dark } from "./dark.themes";
import { light } from "./light.themes";

export const themes = {
  light: light,
  dark: dark,
}

const ButtonThemes = styled.button`
  border: none;
  margin-left: 0.7rem;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px #000;
  &:focus{
    outline: none;
  }
  &:hover{
    opacity: 0.7;
  }
`

export const ThemesToggler = ({ theme, onClick }) => {
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const style = themes[nextTheme].button_themes;
  return (
    <ButtonThemes onClick={() => onClick(nextTheme)} style={style}>
      { theme === 'light' ? <i className="fa fa-moon-o" aria-hidden="true"></i> : <i className="fa fa-sun-o" aria-hidden="true"></i>}
    </ButtonThemes >
  )
}