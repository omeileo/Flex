import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { UserRole } from '../shared/functions/UserRole/userRoleManagement.types';
import routes from './routes.dictionary';

export interface Route {
  name: string;
  path: string;
  isAuthenticationRequired: boolean;
  requiresFlexSetup?: boolean;
  userRole?: UserRole[];
  component: React.ComponentType<object> | null;
  options?: {
    headerShown?: boolean;
    title?: string;
    gestureEnabled?: boolean;
  };
}

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  SignUp: undefined;
  VerifyEmail: undefined;
  FlexBootstrap: undefined;
  MainTabs: undefined;
  ProfileOnboarding: undefined;
  PlanDetail: undefined;
  WorkoutSession: undefined;
  ExerciseDetail: undefined;
  DesignPreviewHub: undefined;
  OnboardingFlowPreview: undefined;
  TrainingPlanFlowPreview: undefined;
  ActiveWorkoutFlowPreview: undefined;
  GymLocationsSettingsPreview: undefined;
  AuthFlowPreview: undefined;
  ProfileSettingsFlowPreview: undefined;
};

export type Routes = typeof routes;

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
