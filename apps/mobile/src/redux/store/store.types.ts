import store from './store';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Utility type for Thunk actions
export type ThunkAction<
  ReturnType,
  StateType = RootState,
  ExtraArgumentType = unknown,
> = (
  dispatch: AppDispatch,
  getState: () => StateType,
  extraArgument: ExtraArgumentType,
) => ReturnType;

// Utility type for Thunk dispatch
export type ThunkDispatch<
  StateType = RootState,
  ExtraArgumentType = unknown,
> = (action: ThunkAction<void, StateType, ExtraArgumentType>) => void;
