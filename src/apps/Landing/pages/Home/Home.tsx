import { FC, } from 'react';

import DeviceDetectorLayout from '@Layout/DeviceDetectorLayout';

import HomeMobile from './mobile/HomeMobile';
import HomeDesktop from './desktop/HomeDesktop';

type HomeProps = object;

const Home: FC<HomeProps> = () => {
  return (
    <DeviceDetectorLayout
      mobileComponent={<HomeMobile/>}
      desktopComponent={<HomeDesktop/>}/>
  );
};

export default Home;