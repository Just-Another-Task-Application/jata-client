import { 
  memo,
  forwardRef, 
} from 'react';

import Menu, { MenuProps, } from '@mui/material/Menu';

type CustomMenuProps = object & MenuProps;

const CustomMenu = forwardRef<any, CustomMenuProps>(
  (
    props,
    ref
  ) => {
    return (
      <Menu
        {...props}
        ref={ref}>
        {props.children}
      </Menu>
    )
  }
);

const MemorizeCustomMenu = memo(CustomMenu);

export default MemorizeCustomMenu;