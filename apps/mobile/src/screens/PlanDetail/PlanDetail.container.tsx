import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getActivePlan } from '@redux/states/trainingPlan/getActivePlan/getActivePlan.slice';
import { AppDispatch, RootState } from '@redux/store/store.types';
import router from '@router/functions/router.functions';

import PlanDetailComponent from './PlanDetail.component';
import { PlanDetailRouteParams } from './PlanDetail.types';

const PlanDetailContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = router.navigate();
  const dayIndex = router.getUrlParam<number>('dayIndex');
  const { loading, success, error } = useSelector(
    (state: RootState) => state.getActivePlan,
  );

  const workout = useMemo(
    () => success?.workouts.find(entry => entry.dayIndex === dayIndex) ?? null,
    [success, dayIndex],
  );

  useEffect(() => {
    if (!success) {
      dispatch(getActivePlan());
    }
  }, [dispatch, success]);

  const handleExercisePress = useCallback(
    (exercise: { exerciseId: number; exerciseName: string }) => {
      navigate('ExerciseDetail', {
        params: {
          exerciseId: exercise.exerciseId,
          exerciseName: exercise.exerciseName,
          dayIndex,
        },
      });
    },
    [navigate, dayIndex],
  );

  const handleStartWorkout = useCallback(() => {
    const params: PlanDetailRouteParams = {
      dayIndex: dayIndex ?? 0,
      workoutName: workout?.name ?? '',
    };

    navigate('WorkoutSession', { params });
  }, [navigate, dayIndex, workout?.name]);

  return (
    <PlanDetailComponent
      workout={workout}
      isLoading={loading}
      error={error}
      onExercisePress={handleExercisePress}
      onStartWorkout={handleStartWorkout}
    />
  );
};

export default PlanDetailContainer;
