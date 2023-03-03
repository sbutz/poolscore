import { useTheme, Box, FormLabel } from '@mui/material';

interface BorderBoxProps {
  label: string;
  children: React.ReactNode;
}

export default function BorderBox(props: BorderBoxProps) {
  const theme = useTheme();

  return (
    <div>
      <FormLabel
        style={{
          marginTop: '-0.71em',
          marginLeft: '0.71em',
          paddingRight: '0.71em',
          paddingLeft: '0.71em',
          backgroundColor: theme.palette.background.default,
          position: 'absolute',
          fontSize: '1.1em',
        }}
      >
        {props.label}
      </FormLabel>
      <Box
        sx={{
          width: 'fitContent',
          borderRadius: 1,
          border: 2,
          borderColor: 'grey.600',
          padding: '0.65em',
        }}
      >
        {props.children}
      </Box>
    </div>
  );
}
