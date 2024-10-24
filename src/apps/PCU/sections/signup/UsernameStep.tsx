import { 
  FC, 
  useEffect, 
  useCallback, 
} from 'react';
import { useTranslation, } from 'react-i18next';
import { 
  useForm, 
  Controller, 
  SubmitHandler, 
} from 'react-hook-form';
import { zodResolver, } from '@hookform/resolvers/zod';

import Back from '@mui/icons-material/KeyboardArrowLeft';
import Enter from '@mui/icons-material/KeyboardReturn';

import {
  Input,
  Typography,
  Button,
} from '@theme/main';

import { Step, } from '@Shared/types/StepperTypes';

import { Username, UsernameSchema, } from '../../schemas/SignupSchema';

type UsernameStepProps = object & Step;

const UsernameStep: FC<UsernameStepProps> = ({
  onActionTriggered,
}) => {
  const { t, } = useTranslation();

  const {
    control,
    formState: { isValid, isValidating, isLoading, },
    handleSubmit,
  } = useForm<Username>({
    resolver: zodResolver(UsernameSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<Username> = (data) => {
    console.log('data', data);
  }

  const handleKeyDown = useCallback((e: any) => {
    if (e.key !== 'Escape') return;

    onActionTriggered('previous');
  }, [onActionTriggered,]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown,]);

  return (
    <section className='size-full flex flex-col justify-center items-start max-w-screen-md w-full'>
      <div className='w-full flex flex-col'>
        <div 
          className='flex items-center text-white mb-6 hover:cursor-pointer'
          onClick={() => onActionTriggered('previous')}>
          <Back />
          <span className='font-poppins'>
            {t('common.back')}
          </span>
        </div>
        <Typography
          variant='h4'
          className='font-raleway text-lg font-normal text-white opacity-85'>
          {t('signup.username.subtitle')}
        </Typography>
        <Typography
          variant='h2'
          className='font-gta-2 text-4xl font-bold text-primary-alt-main'>
          {t('signup.username.title')}
        </Typography>
        <div className='mt-12 size-full flex flex-col gap-y-6 items-start justify-center'>
          <Controller
            render={({ field, fieldState, }) => (
              <Input
                {...field}
                autoFocus
                error={!!fieldState?.error}
                helperText={fieldState?.error?.message}
                placeholder={t('signup.username.placeholder')}
                className='w-full'/>
            )}
            name='username'
            control={control}/>
          <div className='flex items-center gap-x-6'>
            <Button
              disabled={!isValid || isValidating || isLoading }
              color='primary'
              variant='contained'
              onClick={handleSubmit(onSubmit)}>
              {t('common.buttons.continue')}
            </Button>
            <span className='text-white font-raleway capitalize flex items-center gap-x-1'>
              <Enter/>
              Or press enter
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UsernameStep;