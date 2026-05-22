import { StyleSheet } from 'react-native';

import {
  colors,
  fontWeights,
  radii,
  spacing,
  typography,
} from '@shared/styles/StyleConstants';

export default StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  label: {
    color: colors.textInverse,
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.semibold,
  },
});
