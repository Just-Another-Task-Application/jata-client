import { 
  FC,
  ReactNode, 
  PropsWithChildren,
} from 'react';
import { useMediaQuery, } from 'react-responsive';

type DeviceDetectorLayoutProps = object & PropsWithChildren & {
  mobileComponent: FC | ReactNode;
  desktopComponent: FC | ReactNode;
};

const DeviceDetectorLayout: FC<DeviceDetectorLayoutProps> = ({
  mobileComponent,
  desktopComponent,
  children,
}) => {
  const isMobileDevice: boolean = useMediaQuery({ 
    maxWidth: +import.meta.env.VITE_MOBILE_SCREEN, 
  });

  return (
    <>
      {isMobileDevice && mobileComponent}
      {!isMobileDevice && desktopComponent}
      {children && children}
    </>
  );
};

export default DeviceDetectorLayout;