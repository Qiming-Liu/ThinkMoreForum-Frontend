import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import baseThemeOptions from './base-theme-options';
import lightThemeOptions from './light-theme-options';

const createTheme = () => {
  let theme = createMuiTheme(baseThemeOptions, lightThemeOptions, {
    direction: 'ltr',
  });
  theme = responsiveFontSizes(theme);
  return theme;
};

export default createTheme;
