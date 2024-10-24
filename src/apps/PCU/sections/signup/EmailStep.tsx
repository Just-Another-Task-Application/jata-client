import {
  FC,
  useEffect,
  useState,
} from 'react';
import { useRecoilState, useSetRecoilState, } from 'recoil';
import { useTranslation, } from 'react-i18next';
import { 
  useForm, 
  Controller, 
  SubmitHandler, 
} from 'react-hook-form';
import { zodResolver, } from '@hookform/resolvers/zod';

import { 
  Input,
  Button,
  Typography,
} from '@theme/main';

import { Step, } from '@Shared/types/StepperTypes';

import { signupState, } from '../../state/atoms';
import { Email, EmailSchema, } from '../../schemas/SignupSchema';

type EmailStepProps = object & Step;

const EmailStep: FC<EmailStepProps> = ({
  onActionTriggered,
}) => {
  const { t, } = useTranslation();

  const [signupPayloadState, setSignupPayloadState,] = useRecoilState(signupState);

  const [loading, setLoading,] = useState<boolean>(false);

  const {
    control,
    formState: { isValid, isValidating, isLoading, },
    watch,
    handleSubmit,
  } = useForm<Email>({
    resolver: zodResolver(EmailSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<Email> = (data) => {
    setSignupPayloadState((previousState) => ({
      ...previousState,
      ...data,
    }));

    onActionTriggered('next');
  }

  useEffect(() => {
    const { unsubscribe, } = watch((value) => {
      console.log('change value', value);
    });

    return () => {
      unsubscribe();
    };
  }, [watch,]);

  return (
    <section className='size-full flex flex-col justify-center items-center max-w-screen-md w-full mx-auto'>
      <div className='w-full flex flex-col'>
        <div className='text-center'>
          <Typography
            variant='h4'
            className='font-raleway text-lg font-normal opacity-85 text-center'>
            {t('signup.email.subtitle')}
          </Typography>
          <Typography
            variant='h2'
            className='font-gta-2 text-4xl font-bold text-primary-main'>
            {t('signup.email.title')}
          </Typography>
        </div>
        <div className='mt-6 size-full flex flex-col gap-y-6 items-center justify-center'>
          <Controller
            render={({ field, fieldState, }) => (
              <Input
                {...field}
                autoFocus
                error={!!fieldState?.error}
                helperText={fieldState?.error?.message}
                placeholder={t('signup.email.placeholder')}
                className='w-full'
                />
            )}
            name='email'
            control={control}
            defaultValue={signupPayloadState.email ?? ''}/>
          <Button
            disabled={!isValid || isValidating || isLoading }
            color='primary'
            variant='contained'
            onClick={handleSubmit(onSubmit)}>
            {t('common.buttons.next')}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default EmailStep;