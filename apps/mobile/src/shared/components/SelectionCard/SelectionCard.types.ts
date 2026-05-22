import { StyleProp, ViewStyle } from 'react-native';

export type SelectionCardProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  description?: string;
  style?: StyleProp<ViewStyle>;
};
