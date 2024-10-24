import {
  FC,
  memo,
} from 'react';

import {
  Typography,
} from '@theme/main';

type SpinnerProps = object & {
  label?: string;
};

const Spinner: FC<SpinnerProps> = ({
  label
}) => {
  return (
    <div className='flex flex-col items-center gap-y-4'>
      <div className="loader border-t-4 rounded-full border-primary-950 bg-primary-main animate-spin aspect-square w-12 flex justify-center items-center text-primary-main"></div>
      {label && (
        <Typography
          variant='body1'
          className='text-sm font-medium font-poppins'>
          {label}
        </Typography>
      )}
    </div>
  );
};

const MemorizeSpinner = memo(Spinner);

export default MemorizeSpinner;