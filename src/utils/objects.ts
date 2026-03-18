export function getNestedValue<T>(obj: T, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined)
      return undefined;
    current = (current as Record<string, unknown>)[key];
  }

  return current;
}

export function deepEquals(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
