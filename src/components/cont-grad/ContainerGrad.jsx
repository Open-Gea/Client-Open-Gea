import Box from '@mui/material/Box';

export default function ContainerGrad() {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '40%',
        background: 'linear-gradient(87deg, #2dce89 0, #2dcecc 100%)',
      }}
    ></Box>
  );
}
