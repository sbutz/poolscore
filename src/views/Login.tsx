import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  Button, Container, Stack, TextField, Typography,
} from '@mui/material';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../store/Firebase';

interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: boolean;
  submit: () => void;
  submitDisabled: boolean;
  cancel: () => void;
}
function LoginForm({
  email, setEmail, password, setPassword, error, submit, submitDisabled, cancel,
}: LoginFormProps) {
  const errorMessage = error ? 'E-Mail oder Passwort falsch. Bitte versuchen Sie es erneut.' : undefined;
  return (
    <Stack spacing={2} width="100%">
      <Typography variant="h4" textAlign="center">
        Login
      </Typography>
      <TextField
        label="E-Mail"
        type="email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        helperText={errorMessage}
      />
      <TextField
        label="Passwort"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        helperText={errorMessage}
      />
      <Button
        variant="contained"
        disabled={submitDisabled}
        fullWidth
        onClick={submit}
        size="large"
      >
        Anmelden
      </Button>
      <Button
        fullWidth
        onClick={cancel}
        size="large"
      >
        Abbrechen
      </Button>
    </Stack>
  );
}

export default function Login() {
  const [
    signInWithEmailAndPassword,
    user,
    loading, // eslint-disable-line @typescript-eslint/no-unused-vars
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const target = useLocation().state?.target;
  useEffect(() => { if (user) navigate(target); }, [navigate, user, target]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const cancel = () => navigate(-1);
  const submit = () => signInWithEmailAndPassword(email, password);
  const submitDisabled = !(email.includes('@')) || !password;

  return (
    <Stack height="100vh" spacing={5} alignItems="center" justifyContent="center">
      <Container maxWidth="xs">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          submit={submit}
          submitDisabled={submitDisabled}
          cancel={cancel}
          error={error !== undefined}
        />
      </Container>
    </Stack>
  );
}
