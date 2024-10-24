import {
  memo,
  forwardRef,
  useEffect,
  useCallback,
} from 'react';

import Button, { 
  ButtonProps, 
} from '@mui/material/Button';
import Loading from '@mui/icons-material/Loop';

const ENTER_KEY = 13;

type OmitButtonProps = '';

type CustomButtonProps = object & Omit<ButtonProps, OmitButtonProps> & {
  loading?: boolean;
};

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>((
  {
    children,
    loading = false,
    ...args
  },
  ref,
) => {
  const handleKeyDown: (event: any) => void = useCallback((e) => {
    if (e.keyCode !== ENTER_KEY) return;

    if (args.onClick) args.onClick(e);
    if (args.onKeyDown) args.onKeyDown(e);
  }, [args,]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown]);

  return (
    <Button
      {...args}
      className={`text-base rounded-xl normal-case font-poppins font-semibold py-3 px-8 ${args.className ?? ''}`}
      onKeyDown={handleKeyDown}
      ref={ref}>
      {loading && <Loading className='animate-spin'/>}
      {!loading && children}
    </Button>
  );
});

const MemorizeCustomButton = memo(CustomButton);

export default MemorizeCustomButton;