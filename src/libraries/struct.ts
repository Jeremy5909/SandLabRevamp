export function struct<T>(parameters: T) {
  return function(args?: Partial<T>): T {
    return { ...parameters, ...args } as T
  }
}
