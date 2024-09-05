import { memo, forwardRef, } from 'react';

type LoadingBarProps = object & {
  height?: number;
};

const LoadingBar = forwardRef<HTMLDivElement, LoadingBarProps>(
  (props, ref) => {
    return (
      <div 
        ref={ref}
        className='z-[9999] absolute w-full top-0 h-1.5 overflow-hidden'
        style={{
          ...(props?.height && {
            height: `${props?.height}px`,
          }),
        }}>
          <div className='animate-progress h-full bg-primary-main origin-left-right rounded-full'></div>
      </div>
    );
  }
);

const MemorizeLoadingBar = memo(LoadingBar);

export default MemorizeLoadingBar;