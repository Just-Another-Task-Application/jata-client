
import { FC, } from 'react';

import DeviceDetectorLayout from '@Layout/DeviceDetectorLayout';

import ShopMobile from './mobile/ShopMobile';

type ShopProps = object;

const Shop: FC<ShopProps> = () => {
  return (
    <DeviceDetectorLayout
      mobileComponent={<ShopMobile/>}
      desktopComponent={<p>Desktop</p>}/>
  );
};

export default Shop;