const STEP_TYPE = {
  NEXT: 'next',
  PREV: 'previous',
  STEP: 'step',
} as const;

export type StepAction = (typeof STEP_TYPE)[keyof typeof STEP_TYPE];

export type Step = {
  onActionTriggered: (
    action: StepAction,
    stepNumber?: number,
  ) => void;
};