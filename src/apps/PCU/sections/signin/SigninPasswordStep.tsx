import {
  FC,
  memo,
  useCallback,
} from 'react';
import { useTranslation, } from 'react-i18next';
import { 
  useForm, 
  Controller, 
  SubmitHandler, 
} from 'react-hook-form';
import { useNavigate, } from 'react-router-dom';
import { zodResolver, } from '@hookform/resolvers/zod';

import Lock from '@mui/icons-material/Lock';
import Login from '@mui/icons-material/Login';
import ArrowBack from '@mui/icons-material/ArrowBack';

import {
  Input,
  Button,
  Typography,
} from '@theme/main';

import { Step, } from '@Shared/types/StepperTypes';
import { Password, PasswordSchema } from '@pcu/schemas/SigninSchema';

type SigninPasswordStepProps = object & Step;

const SigninPasswordStep: FC<SigninPasswordStepProps> = ({
  onActionTriggered,
}) => {
  const navigate = useNavigate();
  const { t, } = useTranslation();

  const {
    control,
    formState: { 
      isValid, 
      isLoading, 
      isValidating, 
      isSubmitting, 
    },
    handleSubmit,
  } = useForm<Password>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const isFormInValidationOrLoadingStatus: () => boolean = useCallback(() => {
    return isLoading || isValidating || isSubmitting;
  }, [isLoading, isValidating, isSubmitting,])

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);

    navigate({
      pathname: '/pcu',
    });
  };

  return (
    <>
      <div className='flex flex-col gap-y-1'>
        <Typography
          variant='h3'
          className='text-4xl font-platypi font-medium leading-[52px] text-black'>
          {t('signin.welcome', { username: '' })}
          <span className='animate-bounce font-bold text-primary-main'>
            {'Brian Rollins'}
          </span>
        </Typography>
        <div className='mt-0'>
          <Typography
            variant='body1'
            className='font-poppins text-dark-600'>
            {t('signin.helperText-2')}
          </Typography>
        </div>
      </div>
      <div className='flex flex-col gap-y-4 mt-12'>
        <Controller
          render={({ field, }) => (
            <Input
              {...field}
              type='password'
              label={t('signin.password.label')}
              placeholder={t('signin.password.placeholder')}
              icon={<Lock />} />
          )}
          control={control}
          name='password' />
        <div className='mb-0 flex items-center'>
          <Typography
            variant='body1'
            className='text-sm underline ml-auto pl-2'
            role='link'>
            {t('signin.forgotPassword')}
          </Typography>
        </div>
        <div className='w-full ml-auto grow flex items-center gap-x-2'>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => onActionTriggered('previous')}
            className='px-4'>
            <ArrowBack/>
          </Button>
          <Button
            disabled={!isValid || isFormInValidationOrLoadingStatus()}
            loading={isFormInValidationOrLoadingStatus()}
            variant='contained'
            onClick={handleSubmit(onSubmit)}
            className='w-full'
            endIcon={<Login/>}>
            {t('common.buttons.signin')}
          </Button>
        </div>
      </div>
    </>
  )
};

const MemorizeSigninPasswordStep = memo(SigninPasswordStep);

export default MemorizeSigninPasswordStep;