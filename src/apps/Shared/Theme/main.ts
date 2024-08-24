import { createTheme, } from '@mui/material';

import Input from './Input';
import Button from './Button';
import Typography from './Typography';

export const theme = createTheme({
  palette: {
    // primary: {
    //   '50': '#f6f7f9',
    //   '100': '#eceef2',
    //   '200': '#d5dae2',
    //   '300': '#b0bac9',
    //   '400': '#8494ac',
    //   '500': '#657792',
    //   '600': '#505f79',
    //   '700': '#424d62',
    //   '800': '#394253',
    //   '900': '#2e3440', // main
    // },
    primary: {
      '50': '#f4f9fb',
      '100': '#e8f1f6',
      '200': '#cce3eb',
      '300': '#88c0d0', // main
      '400': '#6cb2c4',
      '500': '#4a98ad',
      '600': '#387c91',
      '700': '#2e6376',
      '800': '#295563',
      '900': '#274753',
    }
  },
  components: {
    MuiTextField: {
      variants: [
        {
          props: { 
            variant: 'outlined',
          },
          style: {},
        },
      ],
    },
  },
});

export {
  Input,
  Button,
  Typography,
};