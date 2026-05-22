import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getActivePlan } from '@redux/states/trainingPlan/getActivePlan/getActivePlan.slice';
import { AppDispatch, RootState } from '@redux/store/store.types';
import router from '@router/functions/router.functions';

import PlanHomeComponent from './PlanHome.component';

const PlanHomeContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = router.navigate();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.getActivePlan,
  );

  const loadPlan = useCallback(() => {
    dispatch(getActivePlan());
  }, [dispatch]);

  useEffect(() => {
    loadPlan();
  }, [loadPlan]);

  const handleWorkoutPress = useCallback(
    (workout: { dayIndex: number; name: string }) => {
      navigate('PlanDetail', {
        params: { dayIndex: workout.dayIndex, workoutName: workout.name },
      });
    },
    [navigate],
  );

  return (
    <PlanHomeComponent
      plan={success}
      isLoading={loading}
      error={error}
      onRefresh={loadPlan}
      onWorkoutPress={handleWorkoutPress}
    />
  );
};

export default PlanHomeContainer;
