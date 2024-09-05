import {
  memo,
  forwardRef,
} from 'react';
import MenuItem, { MenuItemProps, } from '@mui/material/MenuItem';

type CustomMenuItemProps = object & MenuItemProps;

const CustomMenuItem = forwardRef<any, CustomMenuItemProps>(
  (
    props,
    ref,
  ) => {
    return (
      <MenuItem
        {...props}
        ref={ref}>
        {props.children}
      </MenuItem>
    );
  }
);

const MemorizeCustomMenuItem = memo(CustomMenuItem);

export default MemorizeCustomMenuItem;