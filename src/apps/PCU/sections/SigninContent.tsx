import {
  memo,
  useRef,
  useMemo,
  useEffect,
  forwardRef,
} from 'react';
import { useTranslation, } from 'react-i18next';

import {
  Input,
  Typography,
} from '@theme/main';

type SigninContentProps = object;

const SigninContent = forwardRef<HTMLElement, SigninContentProps>(
  (_, ref) => {
    const { t, } = useTranslation();

    const sequenceRef = useRef<HTMLSpanElement | null>(null);
    const sequenceIntervalRef = useRef<string | number | null>(null);

    const sequence = useMemo(
      () => t('signin.sequence'), [t,]
    );

    useEffect(() => {
      if (!sequenceRef.current) return;

      let index = 1;
      sequenceIntervalRef.current = window.setInterval(() => {
        if (index > sequence.length - 1) index = 0;

        sequenceRef.current!.textContent = `${sequence[index]}`;

        index++;
      }, 2000);

      return () => {
        if (sequenceIntervalRef?.current)
          clearInterval(sequenceIntervalRef?.current);
      };
    }, [sequence,]);

    return (
      <article
        ref={ref}
        className='h-full w-full flex flex-col'>
        <div className='flex flex-col gap-y-1'>
          <Typography
            variant='h2'
            className='font-platypi font-bold leading-[64px] text-primary-400'>
            {t('signin.greeting')}
          </Typography>
          <Typography
            variant='h3'
            className='font-platypi font-medium leading-[52px] text-dark-800'>
            {t('signin.greeting-2')}
            <span
              ref={sequenceRef}
              className='animate-bounce font-bold text-primary-400'>
              {sequence[0]}
            </span>
          </Typography>
          <div className='mt-4'>
            <Typography
              variant='body1'
              className='font-poppins'>
              Please, enter your credentials to sign in.
            </Typography>
          </div>
        </div>
        <div className='flex flex-col mt-12'>
          <Input
            label='Email'/>
        </div>
        <div className='mt-auto flex items-center text-gray-700'>
          <Typography
            variant='body1'
            className='font-poppins text-sm'>
            {t('common.copyright', { year: new Date().getFullYear() })}
          </Typography>
          <div className='ml-auto'>
            hola
          </div>
        </div>
      </article>
    );
  }
);

const MemorizeSigninContent = memo(SigninContent);

export default MemorizeSigninContent;