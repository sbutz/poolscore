import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, Stack, Typography, Link,
} from '@mui/material';

import FormButton from '../components/FormButton';
import FormField, { FormFieldType } from '../components/FormField';
import {
  AuthValidator, EmailValidator, firstErrorMessage, NotEmptyValidator, PasswordValidator,
} from '../util/Validators';
import { useAuth } from '../store/AuthProvider';
import { useClub } from '../store/ClubProvider';

export default function Register() {
  const navigate = useNavigate();
  const { clubId, signUp, signUpError } = useAuth();
  const { name, setName } = useClub();
  const [error, setError] = useState(signUpError);
  const [clubname, setClubname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => { signUp(email, password); };
  useEffect(() => {
    if (name) {
      navigate('/');
    } else if (clubId && clubname) {
      setName(clubname);
      navigate('/');
    }
  }, [clubId, clubname, name, setName, navigate]);

  useEffect(() => { setError(signUpError); }, [signUpError]);
  useEffect(() => { setError(undefined); }, [email, password]);
  const authValidator = AuthValidator(error);

  const fields = [
    {
      label: 'Vereinsname',
      value: clubname,
      onChange: setClubname,
      validators: [NotEmptyValidator],
    },
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
      validators: [NotEmptyValidator, PasswordValidator, authValidator],
    },
  ];
  const submitDisabled = !!fields.find((f) => firstErrorMessage(f.value, f.validators) != null);

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Box sx={{ width: { xs: '100%', sm: '20rem' } }}>
        {fields.map((f) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <FormField key={f.label} {...f} />
        ))}
        <FormButton disabled={submitDisabled} onClick={onSubmit}>Registrieren</FormButton>
        <Box sx={{
          pt: 1, px: 1, width: '100%', textAlign: 'end',
        }}
        >
          <Typography variant="caption">
            Bereits registriert? Hier gehts zum
            {' '}
            <Link component={RouterLink} to="/login">Login</Link>
            .
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
