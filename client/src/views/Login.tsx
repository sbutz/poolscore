import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import FormButton from '../components/FormButton';
import FormField, { FormFieldType } from '../components/FormField';
import {
  AuthValidator, EmailValidator, firstErrorMessage, NotEmptyValidator, TableCodeValidator,
} from '../util/Validators';
import { useAuth } from '../store/AuthProvider';
import Layout from '../components/HomeLayout';

function AdminLogin() {
  const { signIn, signInError } = useAuth();

  const [error, setError] = useState(signInError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = () => signIn(email, password);

  useEffect(() => { setError(signInError); }, [signInError]);
  useEffect(() => { setError(undefined); }, [email, password]);
  const authValidator = AuthValidator(error);

  const fields = [
    {
      label: 'E-Mail',
      value: email,
      onChange: setEmail,
      validators: [NotEmptyValidator, EmailValidator, authValidator],
    },
    {
      label: 'Password',
      type: 'password' as FormFieldType,
      value: password,
      onChange: setPassword,
      validators: [NotEmptyValidator, authValidator],
    },
  ];

  const submitDisabled = !!fields.find((f) => firstErrorMessage(f.value, f.validators) != null);
  return (
    <>
      <Typography variant="h4" textAlign="center">
        Club-Manager
      </Typography>
      {fields.map((f) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormField key={f.label} {...f} />
      ))}
      <FormButton disabled={submitDisabled} onClick={onSubmit}>Login</FormButton>
    </>
  );
}

function TableLogin() {
  const { signInWithToken, signInWithTokenError } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState(signInWithTokenError);
  const onSubmit = () => {
    signInWithToken(code);
  };

  useEffect(() => { setError(signInWithTokenError); }, [signInWithTokenError]);
  useEffect(() => { setError(undefined); }, [code]);
  const authValidator = AuthValidator(error);

  const fields = [
    {
      label: 'Code',
      value: code,
      onChange: setCode,
      validators: [TableCodeValidator, authValidator],
    },
  ];

  const submitDisabled = !!fields.find((f) => firstErrorMessage(f.value, f.validators) != null);
  return (
    <>
      <Typography variant="h4" textAlign="center">
        Scoreboard
      </Typography>
      {fields.map((f) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormField key={f.label} {...f} />
      ))}
      <FormButton disabled={submitDisabled} onClick={onSubmit}>Login</FormButton>
    </>
  );
}

export default function Login() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (userId) navigate('/home'); }, [navigate, userId]);

  return (
    <Layout>
      <Grid container spacing={5}>
        <Grid xs={12} md={5}>
          <TableLogin />
        </Grid>
        <Grid xs={12} md={2} justifyContent="center" container>
          <Divider textAlign="center" orientation="vertical" />
        </Grid>
        <Grid xs={12} md={5}>
          <AdminLogin />
        </Grid>
      </Grid>
    </Layout>
  );
}
