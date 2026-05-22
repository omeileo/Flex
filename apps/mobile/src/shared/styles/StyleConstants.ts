import { Platform } from 'react-native';

export const colors = {
  background: '#F7F8FA',
  surface: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textInverse: '#FFFFFF',
  accent: '#111827',
  accentEnergy: '#22C55E',
  accentStrength: '#6366F1',
  accentMobility: '#14B8A6',
  accentConditioning: '#F59E0B',
  accentInjury: '#EF4444',
  accentMuted: '#D8E3FB',
  border: '#E5E7EB',
  error: '#DC2626',
  warning: '#F59E0B',
  success: '#16A34A',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  caption: 12,
  body: 14,
  bodyLarge: 16,
  title: 18,
  heading: 22,
  display: 28,
};

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const radii = {
  sm: 4,
  md: 8,
  lg: 16,
  pill: 36,
};

export const elevation = {
  subtle: Platform.select({
    ios: {
      shadowColor: '#111827',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
    },
    android: { elevation: 1 },
    default: {},
  }),
  card: Platform.select({
    ios: {
      shadowColor: '#111827',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
    },
    android: { elevation: 4 },
    default: {},
  }),
  floating: Platform.select({
    ios: {
      shadowColor: '#111827',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
    },
    android: { elevation: 8 },
    default: {},
  }),
};

export const ACTIVE_OPACITY = 0.7;
export const HITSLOP = { top: 10, bottom: 10, left: 10, right: 10 };
