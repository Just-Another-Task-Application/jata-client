import {
  memo,
  useRef,
  useEffect,
  forwardRef,
  ComponentPropsWithRef,
} from 'react';
import { animated, } from '@react-spring/web';

import {
  Input,
  Tooltip,
  Typography,
} from '@theme/main';

import skin from '@assets/img/skin.png';

import Image from '@Components/Image';

type DashboardHeaderProps = object & ComponentPropsWithRef<'header'> & {
  onStatusChange: (headerRef: HTMLElement) => void;
};

const DashboardHeader = forwardRef<HTMLElement, DashboardHeaderProps>(
  (
    {
      style,
      onStatusChange,
    },
    _
  ) => {
    const headerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (!headerRef.current)
        return;

      onStatusChange(headerRef.current);
    }, [])

    return (
      <animated.header 
        ref={headerRef}
        className='z-10 fixed w-full top-0 h-20 shadow-sm bg-white-900 rounded-b-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-b border-b-dark-100'
        style={{
          ...style,
        }}>
        <div className='px-6 py-4 h-full flex items-center gap-x-6 font-raleway'>
          {/* <Typography
            variant='h3'
            className='font-[inherit] text-base font-medium text-dark-800 whitespace-nowrap'>
            Hey <span className='font-bold'>Brian</span>!
          </Typography> */}
          <div className='w-full max-w-screen-md mx-auto'>
            <Input
              placeholder='Search'
              className='py-2'/>
          </div>
          <div className=''>
            <Tooltip
              title='Profile'
              placement='bottom'>
              <Image
                alt='image'
                file={{
                  src: skin,
                }}
                className='h-12 w-12 rounded-full bg-white border border-secondary-600 hover:cursor-pointer'
                onClick={() => console.log('clicked')}/>
            </Tooltip>
          </div>
        </div>
      </animated.header>
    );
  }
);

const MemorizeDashboardHeader = memo(DashboardHeader);

export default MemorizeDashboardHeader;