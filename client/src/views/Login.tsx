import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack } from '@mui/material';

import FormButton from '../components/FormButton';
import FormField, { FormFieldType } from '../components/FormField';
import {
  AuthValidator, EmailValidator, firstErrorMessage, NotEmptyValidator,
} from '../util/Validators';
import { useAuth } from '../store/AuthProvider';
import Layout from '../components/HomeLayout';

export default function Login() {
  const { userId, signIn, signInError } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(signInError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = () => signIn(email, password);

  useEffect(() => { if (userId) navigate('/'); }, [navigate, userId]);

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
    <Layout>
      <Stack height="100%" justifyContent="center" alignItems="center">
        <Box sx={{ width: { xs: '100%', sm: '20rem' } }}>
          {fields.map((f) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <FormField key={f.label} {...f} />
          ))}
          <FormButton disabled={submitDisabled} onClick={onSubmit}>Login</FormButton>
        </Box>
      </Stack>
    </Layout>
  );
}
