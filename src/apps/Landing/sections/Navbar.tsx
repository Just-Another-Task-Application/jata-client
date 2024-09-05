import {
  FC,
  memo,
  useRef,
  useEffect,
  ComponentPropsWithoutRef,
  useMemo,
} from 'react';
import { NavLink, Path, } from 'react-router-dom';
import { animated, } from '@react-spring/web';
import { useTranslation, } from 'react-i18next';

import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import Translate from '@mui/icons-material/Translate';

import {
  Button,
  Tooltip,
  IconButton,
} from '@theme/main';

import logo from '@assets/img/gta-stories-logo.png';

import { useTheme, } from '@Shared/hooks/useTheme';

import Image from '@Components/Image';

type NavbarLink = {
  label: string;
  tooltip?: string;
  to?: string | Path;
  action?: (...args: Array<any>) => any;
};

type NavbarProps = object & ComponentPropsWithoutRef<'header'> & {
  onStatusChange: (navbarRef: HTMLElement) => void;
};

export const Navbar: FC<NavbarProps> = ({
  style,
  onStatusChange,
}) => {
  const { t, } = useTranslation();
  const { theme, setTheme, } = useTheme();

  const navbarRef = useRef<HTMLElement | null>(null);

  const navbarLinks = useMemo<Array<NavbarLink>>(
    () => [
      {
        label: t('landing.navbar.overview.text'),
        to: './',
        tooltip: t('landing.navbar.overview.tooltip'),
      },
      {
        label: t('landing.navbar.shop.text'),
        to: './shop',
        tooltip: t('landing.navbar.shop.tooltip'),
      },
      {
        label: t('landing.navbar.forum.text'),
        to: './forum',
        tooltip: t('landing.navbar.forum.tooltip'),
      },
    ], []
  );

  const handleChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    if (!navbarRef.current)
      return;

    onStatusChange(navbarRef.current);
  }, []);

  return (
    <animated.header
      ref={navbarRef}
      className='z-10 h-20 fixed top-0 w-full shadow-sm bg-white rounded-b-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border-b border-b-transparent'
      style={{
        ...style,
      }}>
      <div className='px-12 h-full flex items-center gap-x-6'>
        <div className='h-full flex items-center'>
          <Image
            alt='logo'
            file={{
              src: logo,
            }}
            className='h-9 w-auto' />
        </div>
        <div className='relative ml-auto flex items-center gap-x-6 font-montserrat-alternates text-white'>
          <div className='self-center flex items-center gap-x-4'>
            <Tooltip
              title={t('landing.navbar.darkMode.tooltip')}
              placement='bottom'>
              <IconButton
                color='inherit'
                onClick={() => handleChangeTheme()}>
                {theme === 'dark' && <LightMode/>}
                {theme === 'light' && <DarkMode/>}
              </IconButton>
            </Tooltip>
            <Tooltip
              title={t('landing.navbar.language.tooltip')}
              placement='bottom'>
              <IconButton 
                color='inherit'>
                <Translate/>
              </IconButton>
            </Tooltip>
          </div>
          <span>|</span>
          {navbarLinks && navbarLinks.map(link => (
            <NavLink
              key={link?.label}
              to={link?.to ?? ''}
              className={({ isActive, }) => isActive ? 'text-primary-main font-extrabold hover:text-secondary-main' : 'hover:text-primary-main font-bold'}>
              <Tooltip
                title={link?.tooltip}
                placement='bottom'>
                <span
                  className='font-[inherit] text-inherit font-inherit py-4 px-4 bg-inherit'
                  onClick={link?.action}>
                  {link?.label}
                </span>
              </Tooltip>
            </NavLink>
          ))}
          <div className='ml-4'>
            <Tooltip
              title={t('landing.navbar.pcu.tooltip')}>
              <Button
                variant='contained'
                color='primary'
                className='hover:bg-secondary-main font-montserrat-alternates'>
                {t('landing.navbar.pcu.text')}
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </animated.header>
  );
};

const MemorizeNavbar = memo(Navbar);

export default MemorizeNavbar;