import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getActivePlan } from '@redux/states/trainingPlan/getActivePlan/getActivePlan.slice';
import { AppDispatch, RootState } from '@redux/store/store.types';
import router from '@router/functions/router.functions';

import ExerciseDetailComponent from './ExerciseDetail.component';

const ExerciseDetailContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const exerciseId = router.getUrlParam<number>('exerciseId');
  const dayIndex = router.getUrlParam<number>('dayIndex');
  const { loading, success, error } = useSelector(
    (state: RootState) => state.getActivePlan,
  );

  const exercise = useMemo(() => {
    const workout = success?.workouts.find(
      entry => entry.dayIndex === dayIndex,
    );

    return (
      workout?.exercises.find(entry => entry.exerciseId === exerciseId) ?? null
    );
  }, [success, dayIndex, exerciseId]);

  useEffect(() => {
    if (!success) {
      dispatch(getActivePlan());
    }
  }, [dispatch, success]);

  return (
    <ExerciseDetailComponent
      exercise={exercise}
      isLoading={loading}
      error={error}
    />
  );
};

export default ExerciseDetailContainer;
