import { FC, useRef, } from 'react';
import { Outlet, useNavigation, } from 'react-router-dom';

import LoadingBar from '@Components/LoadingBar';

type RootLayoutProps = object;

const RootLayout: FC<RootLayoutProps> = () => {
  const navigation = useNavigation();

  const loadingBarRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {navigation?.state === 'loading' && <LoadingBar ref={loadingBarRef}/>}
      <div style={{
        position: 'relative',
        top: navigation?.state === 'loading' && loadingBarRef.current ? `${loadingBarRef?.current?.clientHeight}px` : '0px',
      }}>
        <Outlet/>
      </div>
    </>
  );
};

export default RootLayout;