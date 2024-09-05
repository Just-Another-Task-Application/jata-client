import { FC, } from 'react';
import { useTranslation, } from 'react-i18next';

import {
  Typography,
} from '@theme/main';

type NotFoundLayoutProps = object;

const NotFoundLayout: FC<NotFoundLayoutProps> = () => {
  const { t, } = useTranslation();

  return (
    <section className='w-full h-screen overflow-hidden text-black dark:bg-black dark:text-white'>
      <div className='relative size-full max-w-screen-2xl mx-auto px-12'>
        <div className='size-full flex items-center gap-x-12'>
          <div className='flex flex-col max-w-screen-md px-12 2xl:px-0'>
            <div>
              <Typography
                variant='h2'
                className='font-platypi text-primary-main text-7xl 2xl:text-8xl font-bold'>
                <span className='text-black dark:text-white'>Oops</span>! 
                <span className='text-black dark:text-white'> No encontramos la</span>
                <span className='text-black dark:text-white'> página</span>.
              </Typography> 
            </div>
            <div className='mt-6'>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundLayout;