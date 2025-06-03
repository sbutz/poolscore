import { useEffect, useState } from 'react';

export default function useStableValue<T>(
  initialValue: T,
  isEqual: (prev: T, next: T) => boolean,
  onChange?: () => void,
): T {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (!isEqual(value, initialValue)) {
      onChange?.();
      setValue(initialValue);
    }
  }, [value, initialValue, isEqual, onChange]);

  return value;
}
