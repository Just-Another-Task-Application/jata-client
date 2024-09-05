import { forwardRef, memo, } from 'react';

import Tooltip, { TooltipProps, } from '@mui/material/Tooltip';

type OmitTooltipProps = '';

type CustomTooltipProps = object & Omit<TooltipProps, OmitTooltipProps>;

const CustomTooltip = forwardRef<any, CustomTooltipProps>(
  (
    {
      children,
      className,
      ...args
    }, 
    ref
  ) => {
    return (
      <Tooltip 
        {...args}
        arrow
        color='#00f001'
        ref={ref}
        slotProps={{
          tooltip: {
            className: 'font-poppins',
          },
        }}>
        {children}
      </Tooltip>
    );
  }
);

const MemorizeCustomTooltip = memo(CustomTooltip);

export default MemorizeCustomTooltip;