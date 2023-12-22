import { AuthError } from 'firebase/auth';

export type Validator = (value: string) => string | null;

export function firstErrorMessage(value: string, validators: Validator[]) {
  const error = validators.find((v) => v(value) !== null);
  return error ? error(value) : null;
}

export function NotEmptyValidator(value: string) {
  // eslint-disable-next-line react/destructuring-assignment
  return value.trim().length === 0 ? 'Darf nicht leer sein.' : null;
}

export function NotInValidator(values: string[], error: string) {
  return (value: string) => (values.includes(value) ? error : null);
}

export function EmailValidator(value: string) {
  // eslint-disable-next-line react/destructuring-assignment
  return value.includes('@') ? null : 'Muss eine valide E-Mail Adresse sein.';
}

export function PasswordValidator(value: string) {
  // eslint-disable-next-line react/destructuring-assignment
  return value.length >= 6 ? null : 'Das Passwort muss mindestens 6 Zeichen lang sein.';
}

export function AuthValidator(error?: AuthError): Validator {
  return () => {
    if (!error) return null;
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Die E-Mail-Adresse ist bereits in Verwendung.';
      case 'auth/invalid-email':
        return 'Die E-Mail-Adresse ist ungültig.';
      case 'auth/invalid-password':
        return 'Das Passwort muss mindestens 6 Zeichen lang sein.';
      case 'auth/internal-error':
        return 'Du scheinst offline zu sein. Bitte prüfe deine Internetverbindung.';
      case 'auth/user-not-found':
        return 'Es ist kein Nutzer mit dieser E-Mail-Adresse registriert.';
      case 'auth/wrong-password':
        return 'Das Passwort ist falsch.';
      case 'functions/not-found':
        return 'Ungültiger oder abgelaufener Tischcode';
      default:
        throw error;
    }
  };
}

export function TableCodeValidator(value: string) {
  // eslint-disable-next-line react/destructuring-assignment
  return value.trim().match('[0-9A-Z]{4}') ? null : 'Ungültiger Tischcode.';
}
