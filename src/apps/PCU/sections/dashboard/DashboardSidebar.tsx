import { 
  memo,
  useRef,
  useMemo,
  useState,
  forwardRef,
  ReactNode,
  MouseEvent,
  ComponentPropsWithRef,
  useEffect,
} from 'react';
import { 
  animated, 
  // useSpring, 
} from '@react-spring/web';
import { useTranslation, } from 'react-i18next';
import { 
  Path, 
  NavLink,
  // useNavigate,
} from 'react-router-dom';

import Tune from '@mui/icons-material/Tune';
import Logout from '@mui/icons-material/Logout';
import Chat from '@mui/icons-material/ChatBubble';
import Terminal from '@mui/icons-material/Terminal';
import Inventory from '@mui/icons-material/Inventory';
import Dashboard from '@mui/icons-material/SpaceDashboard';
import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';

import {
  Tooltip,
  IconButton,
} from '@theme/main';

import logo from '@assets/img/gta-logo.svg';

import Image from '@Components/Image';

const SIDEBAR_WIDTH = 96;

type Link = {
  label: string;
  icon: ReactNode;
  to: string | Path,
};

type DashboardSidebarProps = object & ComponentPropsWithRef<'aside'> & {
  onStatusChange: (sidebarRef: HTMLElement) => void;
};

const DashboardSidebar = forwardRef<HTMLElement, DashboardSidebarProps>(
  (
    {
      onStatusChange,
    }, 
    _
  ) => {
    // const navigate = useNavigate();
    const { t, } = useTranslation();

    const sidebarRef = useRef<HTMLElement | null>(null);

    const [open, setOpen,] = useState<boolean>(true);
    const [width, ,] = useState<number>(SIDEBAR_WIDTH);

    // const springs = useSpring({
    //   from: { width: 0, },
    //   to: { width: SIDEBAR_WIDTH, },
    // });

    const links = useMemo<Array<Link>>(
      () => [
        {
          label: t('dashboard.sidebar.dashboard'),
          icon: <Dashboard/>,
          to: './dashboard',
        },
        {
          label: t('dashboard.sidebar.settings'),
          icon: <Tune/>,
          to: './settings',
        },
        {
          label: t('dashboard.sidebar.inventory'),
          icon: <Inventory/>,
          to: './inventory',
        },
        {
          label: t('dashboard.sidebar.chat'),
          icon: <Chat/>,
          to: './chat',
        },
      ], [t]
    )

    const handleSidebarStatus: (event: MouseEvent) => void = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!sidebarRef?.current)
        return;

      if (!open) {
        sidebarRef.current.style.left = `${0}px`;
        setOpen(true);
      } else {
        sidebarRef.current.style.left = `-${sidebarRef?.current!.clientWidth}px`;
        setOpen(false);
      }

      onStatusChange(sidebarRef.current);
    };

    useEffect(() => {
      if (!sidebarRef.current)
        return;

      onStatusChange(sidebarRef.current);
    }, [open,]);

    return (
      <animated.aside 
        ref={sidebarRef}
        className='z-10 absolute left-0 h-full min-h-screen bg-primary-main'
        style={{
          width: `${width}px`,
        }}>
        <animated.div
          role='button'
          className='absolute top-4 -right-6 flex items-center justify-center h-5 w-6 text-white bg-primary-main rounded-tr-lg rounded-br-lg hover:cursor-pointer'
          onClick={handleSidebarStatus}>
          {open && <KeyboardDoubleArrowLeft fontSize='small'/>}
          {!open && <KeyboardDoubleArrowRight fontSize='small'/>}
        </animated.div>
        <div className='p-6 h-full flex flex-col'>
          <div className='w-full h-12'>
            <Image
              file={{
                src: logo,
              }}
              alt='Logo'
              imgClassName='object-contain' />
          </div>
          <div className='mt-auto flex flex-col gap-y-4'>
            {links && links.map(link => (
              <Tooltip 
                key={link.label}
                title={link.label}
                placement='right'>
                <NavLink
                  to={link?.to}
                  className='rounded-md'
                  style={({ isActive, }) => ({
                    color: isActive ? 'var(--color-dark)' : 'white',
                    backgroundColor: isActive ? 'white' : 'transparent',
                  })}>
                  <IconButton 
                    size='large'
                    className='text-inherit bg-inherit rounded-[inherit]'>
                    {link?.icon}
                  </IconButton>
                </NavLink>
              </Tooltip>
            ))}
          </div>
          <div className='mt-auto flex flex-col gap-y-4'>
            <Tooltip
              title={'Console'}
              placement='right'>
              <IconButton className='text-white'>
                <Terminal/>
              </IconButton>
            </Tooltip>
            <Tooltip
              title={'Log Out'}
              placement='right'>
              <IconButton className='text-white'>
                <Logout/>
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </animated.aside>
    );
  }
);

const MemorizeDashboardSidebar = memo(DashboardSidebar);

export default MemorizeDashboardSidebar;