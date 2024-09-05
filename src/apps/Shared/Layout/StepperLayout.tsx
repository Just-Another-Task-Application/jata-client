import { 
  memo,
  Children,
  forwardRef, 
  ComponentPropsWithRef, 
} from 'react';

type StepperLayoutProps = object & ComponentPropsWithRef<'div'> & {
  currentStep: number;
};

const StepperLayout = forwardRef<HTMLDivElement, StepperLayoutProps>(
  (
    {
      children,
      className,
      currentStep = 0,
    },
    ref
  ) => {
    const steps = Children.toArray(children);

    return (
      <div 
        ref={ref}
        className={className}>
        {steps && steps?.length > 0 && steps[currentStep]}
      </div>
    );
  }
);

const MemorizeStepper = memo(StepperLayout)

export default MemorizeStepper;