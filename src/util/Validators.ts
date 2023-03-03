export type Validator = (value: string) => string | null;

export const firstErrorMessage = (value: string, validators: Validator[]) => {
  for (const v of validators) if (v(value) !== null) return v(value);
  return null;
};

export function NotEmptyValidator(value: string) {
  return value.trim().length === 0 ? 'Darf nicht leer sein.' : null;
}

export const NotInValidator = (values: string[], error: string) => function (value: string) {
  return values.includes(value) ? error : null;
};
