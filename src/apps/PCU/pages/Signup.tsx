import {
  FC,
  useRef,
  useState,
} from 'react';
import { useRecoilState, } from 'recoil';
import { useTranslation, } from 'react-i18next';

import { 
  Button,
  Typography, 
} from '@theme/main';

import { StepAction, } from '@Shared/types/StepperTypes';

import { signupState } from '../state/atoms';
import { Signup as SignupModel } from '../schemas/SignupSchema';

import Stepper from '@Layout/StepperLayout';

import Preview from '../sections/signup/Preview';
import EmailStep from '../sections/signup/EmailStep';
import UsernameStep from '../sections/signup/UsernameStep';

type SignupProps = object;

const Signup: FC<SignupProps> = () => {
  const { t, } = useTranslation();

  const stepperRef = useRef<HTMLDivElement | null>(null);

  // const [signupPayloadState, setSignupPayloadState,] = useRecoilState(signupState);

  const [currentStep, setCurrentStep,] = useState<number>(0);

  const handleActionTriggered: (
    step: StepAction,
    stepNumber?: number,
  ) => void = (step, stepNumber) => {
    const actions: { 
      [K in StepAction]: () => void;
    } = {
      'next': () => setCurrentStep(currentStep + 1),
      'previous': () => setCurrentStep(currentStep - 1),
      'step': () => stepNumber && setCurrentStep(stepNumber),
    };

    return actions[step]();
  };

  return (
    <section className='relative h-screen w-full overflow-hidden'>
      <div className='-z-10 absolute size-full top-0 right-0 bg-white'></div>
      <div className='size-full flex flex-col max-w-screen-2xl mx-auto'>
        <div className='w-full flex items-center h-auto p-6'>
          <div className='h-11 w-11 rounded-lg bg-slate-500'></div>
          <div className='ml-auto'>
            <Button
              variant='outlined'
              color='secondary'
              size='small'
              className='py-2 px-6'>
              {t('common.help')}
            </Button>
          </div>
        </div>
        <div className='relative size-full'>
          <Stepper
            currentStep={currentStep}
            className='size-full px-7'
            ref={stepperRef}>
            <EmailStep onActionTriggered={handleActionTriggered}/>
            <UsernameStep onActionTriggered={handleActionTriggered}/>
          </Stepper>
          {currentStep > 0 && (
            <Preview
              style={{
                ...(stepperRef.current && {
                  marginRight: window.getComputedStyle(stepperRef.current).getPropertyValue('padding-right'),
                })
              }} />
          )}
        </div>
        <div className='w-full flex items-center py-12 px-6'>
          <Typography
            variant='body1'
            className='font-poppins text-sm text-white'>
            {t('common.copyright.company', { year: new Date().getFullYear(), })}
          </Typography>
        </div>
      </div>
    </section>
  );
}

export default Signup;