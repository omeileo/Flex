export type RestTimerBarProps = {
  secondsRemaining: number;
  nextSetLabel: string;
  onSkip: () => void;
  onAdjust: (deltaSeconds: number) => void;
};
