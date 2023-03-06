export type Validator = (value: string) => string | null;

export const firstErrorMessage = (value: string, validators: Validator[]) => {
  const error = validators.find((v) => v(value) !== null);
  return error ? error(value) : null;
};

export function NotEmptyValidator(value: string) {
  // eslint-disable-next-line react/destructuring-assignment
  return value.trim().length === 0 ? 'Darf nicht leer sein.' : null;
}

export function NotInValidator(values: string[], error: string) {
  return (value: string) => (values.includes(value) ? error : null);
}
