import {
  FC,
  memo,
  useRef,
  useMemo,
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

import User from '@mui/icons-material/Person';

import {
  Input,
  Button,
  Checkbox,
  Typography,
} from '@theme/main';

import { Step, } from '@Shared/types/StepperTypes';
import { Username, UsernameSchema, } from '@pcu/schemas/SigninSchema';

type SigninUsernameStepProps = object & Step;

const SigninUsernameStep: FC<SigninUsernameStepProps> = ({
  onActionTriggered,
}) => {
  const { t, } = useTranslation();

  const sequenceRef = useRef<HTMLSpanElement | null>(null);
  const sequenceIntervalRef = useRef<string | number | null>(null);

  const sequence = useMemo(
    () => t('signin.sequence'), [t,]
  );

  const {
    control,
    formState: { 
      isValid, 
      isLoading, 
      isValidating, 
      isSubmitting, 
    },
    handleSubmit,
  } = useForm<Username>({
    resolver: zodResolver(UsernameSchema),
    defaultValues: {
      username: '',
      remember: false,
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const isFormInValidationOrLoadingStatus: () => boolean = useCallback(() => {
    return isLoading || isValidating || isSubmitting;
  }, [isLoading, isValidating, isSubmitting,])

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);

    onActionTriggered('next');
  };

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
    <>
      <div className='flex flex-col'>
        <Typography
          variant='h2'
          className='font-gta-2 font-bold leading-[48px] text-primary-main'>
          {t('signin.greeting')}
        </Typography>
        <Typography
          variant='h3'
          className='font-gta-2 font-medium leading-[44px] text-black'>
          {t('signin.greeting-2')}
          <span
            ref={sequenceRef}
            className='animate-bounce font-bold text-primary-main'>
            {sequence[0]}
          </span>
        </Typography>
        <div className='mt-4'>
          <Typography
            variant='body1'
            className='font-poppins text-dark-600'>
            {t('signin.helperText')}
          </Typography>
        </div>
      </div>
      <div className='flex flex-col gap-y-4 mt-12'>
        <Controller
          render={({ field, }) => (
            <Input
              {...field}
              label={t('signin.username.label')}
              placeholder={t('signin.username.placeholder')}
              icon={<User />} />
          )}
          control={control}
          name='username' />
        <div className='mb-0 flex items-center'>
          <Controller
            render={({ field, }) => (
              <Checkbox
                {...field}
                label={t('signin.remember.label')} />
            )}
            control={control}
            name='remember' />
        </div>
        <div className='ml-auto grow'>
          <Button
            disabled={!isValid || isFormInValidationOrLoadingStatus()}
            loading={isFormInValidationOrLoadingStatus()}
            variant='contained'
            onClick={handleSubmit(onSubmit)}>
            {t('common.buttons.next')}
          </Button>
        </div>
      </div>
    </>
  )
};

const MemorizeSigninUsernameStep = memo(SigninUsernameStep);

export default MemorizeSigninUsernameStep;