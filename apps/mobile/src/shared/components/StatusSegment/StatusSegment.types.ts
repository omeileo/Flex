export type WellnessStatus = 'recovered' | 'managing' | 'flareUp';

export type StatusSegmentProps = {
  value: WellnessStatus;
  onChange: (value: WellnessStatus) => void;
};
