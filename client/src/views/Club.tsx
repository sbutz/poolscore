import { useState } from 'react';
import { Stack } from '@mui/material';
import { useClub } from '../store/ClubProvider';
import FormField from '../components/FormField';
import Layout from '../components/HomeLayout';

export default function Club() {
  const { name } = useClub();
  const [image, setImage] = useState<string>('');
  const onChange = async (newImage: string) => {
    setImage(newImage);
  };

  return (
    <Layout>
      <Stack>
        <FormField disabled label="Name" type="text" value={name || ''} />
        <FormField
          label="Logo"
          type="image"
          value={image}
          onChange={onChange}
        />
      </Stack>
    </Layout>
  );
}
