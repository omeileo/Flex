import { StyleSheet } from 'react-native';

import {
  colors,
  fontWeights,
  spacing,
  typography,
} from '@shared/styles/StyleConstants';

export default StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  brand: {
    fontSize: typography.display,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  accentBar: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accentEnergy,
    marginBottom: spacing.md,
  },
  tagline: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
