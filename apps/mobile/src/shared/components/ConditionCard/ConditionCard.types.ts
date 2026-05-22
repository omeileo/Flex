export type ConditionStatus = 'recovered' | 'managing' | 'flareUp';

export type ConditionCardProps = {
  title: string;
  status: ConditionStatus;
  subtitle: string;
  onPress?: () => void;
};
