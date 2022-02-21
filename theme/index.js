import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import baseTheme from './base-theme';
import lightTheme from './light-theme';

const createTheme = () => {
  let theme = createMuiTheme(baseTheme, lightTheme, {
    direction: 'ltr',
  });
  theme = responsiveFontSizes(theme);
  return theme;
};

export default createTheme;
