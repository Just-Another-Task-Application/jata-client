import { 
  forwardRef, 
  ForwardedRef, 
} from 'react';

import { Typography, TypographyProps, } from '@mui/material';

type CustomTypographyProps = object & TypographyProps;

const CustomTypography = forwardRef<HTMLElement, CustomTypographyProps>((
  {
    children,
    ...args
  },
  ref: ForwardedRef<HTMLSpanElement>,
) => {
  return (
    <Typography 
      {...args}
      ref={ref}>
      {children}
    </Typography>
  );
});

export default CustomTypography;