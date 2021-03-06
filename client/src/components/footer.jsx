import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';

function Footer() {
  return (
    <Box>
      <Container>
        <Stack
          sx={{ borderTop: '1px solid', borderColor: 'common.white' }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          height="60px"
          spacing={5}
        >
          <Typography>About</Typography>
          <Typography>FAQ</Typography>
          <Typography>Privacy</Typography>
        </Stack>
      </Container>
      <Stack direction="row" alignItems="center" justifyContent="center" height="60px">
        <Typography>© 2022 DatNguyen | Made by DatNguyen</Typography>
      </Stack>
    </Box>
  );
}

export default Footer;
