import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Box, Stack } from '@mui/material';

import FormButton from '../components/FormButton';
import FormField, { FormFieldType } from '../components/FormField';
import { auth } from '../store/Firebase';
import { EmailValidator, NotEmptyValidator } from '../util/Validators';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const onSubmit = () => signInWithEmailAndPassword(email, password);

  const authValidator = () => {
    if (error) return 'E-Mail oder Passwort falsch.';
    return null;
  };

  useEffect(() => {
    if (loading || error) return;
    if (user) navigate('/');
  }, [navigate, user, loading, error]);

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

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Box sx={{ width: { xs: '100%', sm: '20rem' } }}>
        {fields.map((f) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <FormField key={f.label} {...f} />
        ))}
        <FormButton onClick={onSubmit}>Login</FormButton>
      </Box>
    </Stack>
  );
}
