import {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { animated, } from '@react-spring/web';
import { 
  useTranslation,
} from 'react-i18next';

import {
  Typography,
} from '@theme/main';

import background from '@assets/img/background.webp';

import { useTitle, } from '@Shared/hooks/useTitle';

import Image from '@Components/Image';
import Navbar from '@landing/sections/Navbar';

type HomeProps = object;

const Home: FC<HomeProps> = () => {
  const { t, } = useTranslation();

  const { setTitle, } = useTitle();

  const navbarRef = useRef<HTMLElement | null>(null);

  const [navbarHeight, setNavbarHeight,] = useState<number | null>(null);

  const handleNavbarChange: (navbarElement: HTMLElement) => void = (element) => {
    navbarRef.current = element;

    if (!navbarRef.current)
      return;

    const {
      clientHeight,
    } = navbarRef.current;

    setNavbarHeight(clientHeight);
  };

  useEffect(() => {
    setTitle(t('landing.pageTitle'));
  }, [t]);

  return (
    <div className='relative size-full min-h-screen overflow-hidden dark:bg-black dark:text-white'>
      <Navbar
        style={{
          height: `${navbarHeight}px`,
        }}
        onStatusChange={handleNavbarChange}
      />
      <section className='relative h-full min-h-screen w-full overflow-hidden'>
        <animated.div
          className='absolute w-full h-full'
          style={{
            top: `${navbarHeight}px`
          }}>
          <div
            className='absolute w-full h-full rounded-b-3xl'
            style={{
              top: `-${navbarHeight}px`,
              height: `calc(100vh + ${navbarHeight}px)`,
            }}
          >
            <div className='z-[1] top-[inherit] absolute w-full h-full bg-black opacity-80 rounded-[inherit]'/>
            <Image
              alt='background'
              file={{
                src: background
              }}
              className='absolute top-[inherit] w-full h-screen rounded-[inherit]'
              imgClassName='h-full w-full'
              style={{
                height: `calc(100vh + ${navbarHeight}px)`,
              }}
            />
          </div>
          <div className='z-[2] relative top-0 size-full'
            style={{
              height: `calc(100% - ${navbarHeight}px)`
            }}
          >
            <div className='size-full max-w-screen-2xl mx-auto px-12'>
              <div className='size-full flex items-center gap-x-12'>
                <div className='flex flex-col max-w-screen-md px-12 2xl:px-0'>
                  <div 
                    className='flex flex-col text-7xl 2xl:text-9xl font-gta-2 lowercase text-white'>
                    <span className='2xl:leading-[120px]'>{t('landing.title.grand')}</span>
                    <span className='2xl:leading-[120px]'>{t('landing.title.theft')}</span>
                    <span className='2xl:leading-[120px]'>{t('landing.title.auto')}</span>
                    <span
                      className='leading-[72px] text-primary-main'
                      style={{
                        textShadow: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black'
                      }}>
                      {t('landing.title.stories')}
                    </span>
                  </div>
                  <div className='mt-6 py-6'>
                    <Typography
                      variant='body1'
                      className='font-poppins text-lg text-white'>
                      {t('landing.summary')}
                    </Typography>
                  </div>
                </div>
                {/* <div className='ml-auto'></div> */}
              </div>
            </div>
          </div>
        </animated.div>
      </section>
      {/* <div className='h-full min-h-screen'>
        Hola
      </div> */}
    </div>
  );
};

export default Home;