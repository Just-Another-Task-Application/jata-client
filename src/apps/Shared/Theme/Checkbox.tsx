import {
  memo,
  forwardRef,
} from 'react';

import Checkbox, { CheckboxProps, } from '@mui/material/Checkbox';

import {
  Typography,
} from '@theme/main';

type OmitCheckboxProps = 'sx';

type CustomCheckboxProps = object & Omit<CheckboxProps, OmitCheckboxProps> & {
  label: string;
  description?: string;
};

const CustomCheckbox = forwardRef<HTMLButtonElement, CustomCheckboxProps>((
  {
    label,
    description,
    size = 'medium',
    ...args
  },
  ref
) => {
  return (
    <label
      htmlFor={args.id}
      className='flex items-center'>
      <Checkbox
        {...args}
        id={args.id}
        size={size}
        ref={ref} />
      <div className='flex flex-col gap-y-1'>
        <Typography
          variant='body1'
          className='text-sm font-regular font-poppins'>
          {label}
        </Typography>
        {description && (
          <Typography
            variant='body1'
            className='text-xs font-raleway'>
            {description}
          </Typography>
        )}
      </div>
    </label>
  );
});

const MemorizeCustomCheckbox = memo(CustomCheckbox);

export default MemorizeCustomCheckbox;