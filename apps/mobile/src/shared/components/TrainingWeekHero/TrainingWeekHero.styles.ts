import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createTrainingWeekHeroStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
      overflow: 'hidden'
    },
    accentBar: {
      height: 4,
      backgroundColor: colors.accentStrength,
      marginBottom: spacing.md,
      marginLeft: -spacing.md,
      marginRight: spacing.xl,
      borderTopRightRadius: radii.sm,
      borderBottomRightRadius: radii.sm
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },
    copyBlock: {
      flex: 1,
      paddingRight: spacing.md
    },
    eyebrow: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.accentStrength,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      marginBottom: spacing.xs
    },
    weekLine: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: spacing.xs
    },
    weekNumber: {
      fontSize: typography.display + 16,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      lineHeight: typography.display + 16
    },
    weekTotal: {
      fontSize: typography.title,
      fontWeight: fontWeights.medium,
      color: colors.textSecondary
    },
    ringWrap: {
      width: 72,
      height: 72,
      alignItems: 'center',
      justifyContent: 'center'
    },
    ringTrack: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 36,
      borderWidth: 6,
      borderColor: colors.border
    },
    ringFill: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 36,
      borderWidth: 6,
      borderColor: colors.accentEnergy,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent'
    },
    ringLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary
    }
  })
