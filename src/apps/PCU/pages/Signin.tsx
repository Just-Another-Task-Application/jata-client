import { FC, } from 'react';

import Image from '@Components/Image';
import SigninContent from '@pcu/sections/SigninContent';

import background from '@assets/img/login-background.jpg';

type SigninProps = object;

const Signin: FC<SigninProps> = () => {
  return (
    <section className='h-screen w-full overflow-hidden'>
      <div className='relative h-full w-full'>
        <div className='h-full w-full flex'>
          <div className='relative h-auto max-w-[768px] w-[50%]'>
            <div className='absolute h-full'>
              <Image 
                file={{
                  src: background
                }}
                alt={'Representative login background'}
                className='h-full w-full object-cover rounded-[inherit]'/>
            </div>
          </div>
          <div className='relative grow h-full w-full'>
            <div className='h-full w-full max-w-[768px] mx-auto py-20 px-6'>
              <SigninContent/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;