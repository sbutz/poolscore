import { useEffect, useState } from 'react';

export default function useStableValue<T>(
  initialValue: T,
  isEqual: (prev: T, next: T) => boolean,
): T {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (!isEqual(value, initialValue)) {
      setValue(initialValue);
    }
  }, [value, initialValue, isEqual]);

  return value;
}
