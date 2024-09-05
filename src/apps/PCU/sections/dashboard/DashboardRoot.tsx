import { 
  FC, 
  useRef,
  useState, 
} from 'react';
import { Outlet, } from 'react-router-dom';
import { animated, } from '@react-spring/web';

import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

type DashboardRootProps = object;

const DashboardRoot: FC<DashboardRootProps> = () => {
  const dashboardHeaderRef = useRef<HTMLElement | null>(null);
  const dashboardSidebarRef = useRef<HTMLElement | null>(null);

  const [ headerHeight, setHeaderHeight, ] = useState<number | null>(null);
  const [ sidebarWidth, setSidebarWidth, ] = useState<number | null>(null);

  const handleHeaderChange: (headerElement: HTMLElement) => void = (element) => {
    dashboardHeaderRef.current = element;

    if (!dashboardHeaderRef.current)
      return;

    const {
      clientHeight,
    } = dashboardHeaderRef.current;

    setHeaderHeight(clientHeight);
  };

  const handleSidebarChange: (sidebarElement: HTMLElement) => void = (element) => {
    dashboardSidebarRef.current = element;

    if (!dashboardSidebarRef.current)
      return;

    const {
      clientWidth,
      offsetLeft,
    } = dashboardSidebarRef.current;

    setSidebarWidth(clientWidth + offsetLeft);
  };

  return (
    <section className='relative h-screen w-full overflow-hidden'>
      <DashboardSidebar
        onStatusChange={handleSidebarChange}/>
      <DashboardHeader
        style={{
          width: `calc(100% - ${sidebarWidth}px)`,
          left: `${sidebarWidth}px`,
        }}
        onStatusChange={handleHeaderChange}/>
      <animated.div 
        style={{
          position: 'absolute',
          left: `${sidebarWidth}px`,
          top: `${headerHeight}px`,
        }}>
        <Outlet/>
      </animated.div>
    </section>
  );
};

export default DashboardRoot;