export type Validator = (value: string) => string | null;

export const NotEmptyValidator = (value: string) => {
    return value.trim().length === 0 ? "Darf nicht leer sein." : null;
};