// Utility type to extract action types
export type SliceActions<T> = T extends {
  [key: string]: (...args: unknown[]) => infer A
}
  ? A
  : never
