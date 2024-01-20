import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

export default function CircleChartLoading() {
  return (
    <Stack
      height={1}
      width={1}
      p={3}
      mb={2}
      borderRadius={3}
      sx={{
        background: 'rgba(196, 196, 196, 0.10)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton variant="rounded" width={270} height={30} />
          <Skeleton variant="circular" width={35} height={35} />
        </Box>

       <Box sx={{width: "100%", display: "flex", justifyContent: "center"}}>
         <Skeleton variant="circular" width={250} height={250} />
       </Box>

      </Stack>

      <Skeleton variant="rounded" width={200} height={30} sx={{ marginTop: 'auto' }} />
    </Stack>
  );
}
