import { 
  FC,
  ReactNode, 
  PropsWithChildren,
  Fragment,
} from 'react';
import { useMediaQuery, } from 'react-responsive';

type DeviceDetectorLayoutProps = object & PropsWithChildren & {
  mobileComponent: ReactNode;
  desktopComponent: ReactNode;
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
    <Fragment>
      {isMobileDevice && mobileComponent}
      {!isMobileDevice && desktopComponent}
      {children && children}
    </Fragment>
  );
};

export default DeviceDetectorLayout;