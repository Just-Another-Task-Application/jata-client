import {
  memo,
  forwardRef,
} from 'react';

import IconButton, { IconButtonProps, } from '@mui/material/IconButton';

type OmitIconButtonProps = '';

type CustomIconButtonProps = object & Omit<IconButtonProps, OmitIconButtonProps>;

const CustomIconButton = forwardRef<any, CustomIconButtonProps>(
  (
    {
      children,
      className,
      ...args
    },
    ref
  ) => {
    return (
      <IconButton
        {...args}
        ref={ref}
        className={`rounded-md ${className ?? ''}`}>
        {children}
      </IconButton>
    );
  }
);

const MemorizeIconButton = memo(CustomIconButton);

export default MemorizeIconButton;