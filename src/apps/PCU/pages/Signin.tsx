import {
  FC,
  useState,
} from 'react';
import { useTranslation, } from 'react-i18next';

import {
  Typography,
} from '@theme/main';

import { StepAction } from '@Shared/types/StepperTypes';

import Image from '@Components/Image';
import StepperLayout from '@Layout/StepperLayout';

import SigninUsernameStep from '@pcu/sections/signin/SigninUsernameStep';
import SigninPasswordStep from '@pcu/sections/signin/SigninPasswordStep';

import background from '@assets/img/background-2.webp';

type SigninProps = object;

const Signin: FC<SigninProps> = () => {
  const { t, } = useTranslation();

  const [currentStep, setCurrentStep,] = useState<number>(0);

  const handleActionTriggered: (
    action: StepAction,
    stepNumber?: number,
  ) => void = (action, stepNumber) => {
    const actions: { 
      [K in StepAction]: () => void 
    } = {
      'next': () => setCurrentStep((previousState) => previousState + 1),
      'previous': () => setCurrentStep((previousState) => previousState - 1),
      'step': () => setCurrentStep(stepNumber ?? 0),
    };

    return actions[action]();
  };

  return (
    <section className='h-screen w-full overflow-hidden'>
      <div className='relative h-full w-full'>
        <div className='h-full w-full flex'>
          <div className='relative h-auto max-w-screen-md w-full'>
            <div className='absolute h-full'>
              <Image
                file={{
                  src: background
                }}
                alt={'Representative login background'}
                className='h-full w-full object-cover rounded-[inherit]' />
            </div>
          </div>
          <div className='relative grow h-full w-full'>
            <div className='h-full w-full max-w-screen-md mx-auto py-20 px-12 2xl:px-0'>
              <div className='h-full w-full flex flex-col'>
                <StepperLayout
                  currentStep={currentStep}
                  className='h-full w-full flex flex-col'>
                  <SigninUsernameStep onActionTriggered={handleActionTriggered}/>
                  <SigninPasswordStep onActionTriggered={handleActionTriggered}/>
                </StepperLayout>
                <div className='mt-auto flex items-center text-gray-700'>
                  <Typography
                    variant='body1'
                    className='font-poppins text-sm'>
                    {t('common.copyright', { year: new Date().getFullYear() })}
                  </Typography>
                  {/* <div className='ml-auto'>
                    hola
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;