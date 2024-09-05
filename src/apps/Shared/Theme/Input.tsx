import { 
  memo, 
  useRef,
  useState,
  forwardRef,
  ReactNode,
  MouseEvent, 
} from 'react';
import { useSnackbar, } from 'notistack';
import { useTranslation, } from 'react-i18next';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import Copy from '@mui/icons-material/ContentPaste';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type OmitTextFieldProps = 'fullWidth' | 'variant';

type CustomInputProps = object & Omit<TextFieldProps, OmitTextFieldProps> & {
  icon?: ReactNode,
  editable?: boolean;
  clipboard?: boolean;
  onClipboardCopy?: (...args: Array<unknown>) => unknown;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>((
  {
    icon,
    label,
    children,
    onClipboardCopy,
    editable = true,
    clipboard = false,
    ...args
  },
  ref,
) => {
  const { t, } = useTranslation();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const snackbarRef = useRef<string | number | null>(null);

  const { 
    closeSnackbar,
    enqueueSnackbar, 
  } = useSnackbar();

  const [focus, setFocus,] = useState<boolean>(false);
  const [showPassword, setShowPassword,] = useState<boolean>(false);

  const handleClipboard: (event: MouseEvent) => Promise<void> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const rawInputElement = (
      inputRef
        .current
        ?.getElementsByTagName('input')[0] as HTMLInputElement
    );

    const value = rawInputElement?.defaultValue ?? rawInputElement?.value ?? '';

    await navigator
      .clipboard
      .writeText(value);

    const cliptText = await navigator
      .clipboard
      .readText();

    if (snackbarRef.current) closeSnackbar(snackbarRef.current)

    snackbarRef.current = enqueueSnackbar(t('common.messages.copy', { message: cliptText, }), {
      variant: 'default',
    });

    if (onClipboardCopy) onClipboardCopy(cliptText);
  };

  const handleShowPassword: (event: MouseEvent) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const rawInputElement = (
      inputRef
        .current
        ?.getElementsByTagName('input')[0] as HTMLInputElement
    );

    setShowPassword((previousState) => {
      if (!previousState) rawInputElement.type = 'text';
      else rawInputElement.type = 'password';

      return !previousState;
    });
  };

  return (
    <div className='flex flex-col gap-y-2'>
      <label 
        htmlFor={args.id}
        className={`flex flex-col rounded-xl px-3 py-3 border gap-y-1 ${args.className ?? ''} ${focus ? 'border-primary-800' : 'border-dark-200'}`}>
        {label && (
          <span className={`ml-1 text-sm leading-5 font-poppins font-semibold ${focus ? 'text-primary-800' : 'text-dark-900'}`}>
            {label}
          </span>
        )}
        <TextField 
          {...args}
          id={args.id}
          disabled={args.disabled ?? !editable}
          className={`rounded-[inherit] border-none outline-none`}
          InputProps={{
            ...args.InputProps,
            ...(!clipboard && icon && args.type !== 'password' && {
              endAdornment: <span 
                className={`absolute right-0 p-1 rounded-xl ${focus ? 'text-primary-800' : 'text-dark-300'}`}>
                {icon}
              </span>,
            }),
            ...(args.disabled && clipboard && args.type !== 'password' && {
              endAdornment: <span 
                className='z-20 p-1 rounded-md border border-primary-800 text-primary-800 hover:cursor-pointer'
                onClick={handleClipboard}>
                <Copy className='text-xl' />
              </span>,
            }),
            ...(args.type === 'password' && {
              endAdornment: <div className='pr-0'>
                {showPassword && (
                  <span className='hover:cursor-pointer' onClick={handleShowPassword}>
                    <VisibilityOff className='text-dark-400' />
                  </span>
                )}
                {!showPassword && (
                  <span className='hover:cursor-pointer' onClick={handleShowPassword}>
                    <Visibility className='text-dark-400' />
                  </span>
                )}
              </div>
            }),
            ref: inputRef,
            className: `relative rounded-[inherit] border-none outline-none ${args.InputProps?.className ?? ''}`,
          }}
          inputProps={{
            ...args.inputProps,
            onFocus: () => setFocus(true),
            onBlur: (e) => {
              if (args.onBlur) args?.onBlur(e);
              setFocus(false);
            },
            className: `border-none outline-none rounded-[inherit] py-1 px-1 text-dark-600 font-poppins font-medium ${args.inputProps?.className ?? new String()}`
          }}
          ref={(nativeElement) => {
            inputRef.current = nativeElement as HTMLInputElement;
            // ref = nativeElement;
          }}>
          {children}
        </TextField>
      </label>
    </div>
  )
});

const MemorizeCustomTextField = memo(CustomInput);

export default MemorizeCustomTextField;