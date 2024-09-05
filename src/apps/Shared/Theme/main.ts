import { createTheme, } from '@mui/material';

import palette from '@root/src/palette';

import Menu from './Menu';
import Input from './Input';
import Button from './Button';
import Tooltip from './Tooltip';
import MenuItem from './MenuItem';
import Checkbox from './Checkbox';
import Typography from './Typography';
import IconButton from './IconButton';

export const theme = createTheme({
  palette: {
    primary: {
      // main: '#072ac8',
      // '50': '#e8f5ff',
      // '100': '#d5ebff',
      // '200': '#b3d8ff',
      // '300': '#86bdff',
      // '400': '#5793ff',
      // '500': '#3168ff',
      // '600': '#0e39ff',
      // '700': '#042efe',
      // '800': '#112e9e',
      // '900': '#0a195c',
      ...palette.primary,
    },
    secondary: {
      // main: '#f77f00',
      // '50': '#fffaec',
      // '100': '#fff5d3',
      // '200': '#ffe6a5',
      // '300': '#ffd36d',
      // '400': '#ffb432',
      // '500': '#ff9b0a',
      // '600': '#cc6002',
      // '700': '#a14a0b',
      // '800': '#823e0c',
      // '900': '#461d04',
      ...palette.secondary,
    }
  },
  components: {
    MuiTextField: {
      variants: [
        {
          props: {
            variant: "outlined",
          },
          style: {},
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: 'none',
        },
      },
    },
  },
});

export { 
  Menu,
  Input, 
  Button, 
  Tooltip,
  MenuItem,
  Checkbox,
  Typography, 
  IconButton,
};
