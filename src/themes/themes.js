import React from "react"
import './themes.css';

export const themes = {
  light: {
    nav: {
      backgroundColor: '#fff',
      color: '#333'
    },
    link: {
      color: '#333'
    },
    body: {
      backgroundColor: '#f8f9fb',
      flexGrow: 1,
      position: 'relative'
    },
    footer: {
      backgroundColor: '#fff',
      color: '#333',
      borderTop: '1px solid rgb(220, 228, 198)',
    }
  },
  dark: {
    nav: {
      backgroundColor: '#242526',
      color: '#fff'
    },
    link: {
      color: '#fff'
    },
    body: {
      backgroundColor: '#18191A',
      flexGrow: 1,
      position: 'relative'
    },
    footer: {
      backgroundColor: '#242526',
      color: '#fff',
      borderTop: '1px solid gray',
    }
  },
}

export const ThemesToggler = ({ theme, onClick }) => {
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const style = themes[nextTheme].nav;
  return (
    <button className="btn-change-mode" onClick={() => onClick(nextTheme)} style={style}>
      { theme === 'light' ? <i className="fa fa-moon-o" aria-hidden="true"></i> : <i className="fa fa-sun-o" aria-hidden="true"></i>}
    </button >
  )
}