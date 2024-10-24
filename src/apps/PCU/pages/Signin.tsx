import {
  FC,
  useState,
} from 'react';
import { useTranslation, } from 'react-i18next';

import { BsDiscord, } from 'react-icons/bs';

import {
  Button,
  Typography,
} from '@theme/main';

import background from '@assets/img/background-2.webp';

import { StepAction } from '@Shared/types/StepperTypes';

import Image from '@Components/Image';
import StepperLayout from '@Layout/StepperLayout';

import SigninUsernameStep from '@pcu/sections/signin/SigninUsernameStep';
import SigninPasswordStep from '@pcu/sections/signin/SigninPasswordStep';

type SigninProps = object;

const Signin: FC<SigninProps> = () => {
  const { t, } = useTranslation();

  const [currentStep, setCurrentStep,] = useState<number>(0);

  const createRandomSecureState: (length?: number) => string = (length = 32) => {
    return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  };

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

  const handleDiscordSignin: () => Promise<void> = async () => {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_DISCORD_CLIENT_REDIRECT_URI);

    const state = createRandomSecureState();
    sessionStorage.setItem('oauth_state', state);

    const scope = encodeURIComponent(import.meta.env.VITE_DISCORD_CLIENT_SCOPES);
    const responseType = 'code';

    const authorizationUrl = `${import.meta.env.VITE_DISCORD_CLIENT_AUTHORIZATION_URI}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

    window.location.href = authorizationUrl;
  }

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
              <div className='relative h-full w-full flex flex-col gap-y-4'>
                <StepperLayout
                  currentStep={currentStep}
                  className='h-auto flex flex-col mb-12'>
                  <SigninUsernameStep onActionTriggered={handleActionTriggered}/>
                  <SigninPasswordStep onActionTriggered={handleActionTriggered}/>
                </StepperLayout>
                <div className='flex flex-col justify-center gap-y-4'>
                  <span className='h-[2px] w-full bg-dark-200'></span>
                  <span className='text-center text-lg font-normal font-poppins'>
                    {t('common.or')}
                  </span>
                  <Button
                    fullWidth
                    variant='contained'
                    className='bg-[#5865F2] hover:bg-[#5865F2] max-w-96 mx-auto'
                    startIcon={<BsDiscord/>}
                    onClick={() => handleDiscordSignin()}>
                    {t('signin.discord')}
                  </Button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;