import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

export default function HorizontalLineChartLoading() {
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
          <Skeleton variant="rounded" width={275} height={25} />
          <Skeleton variant="circular" width={35} height={35} />
        </Box>

        <Box sx={{display:"flex",justifyContent:"space-between",gap:"12px"}}>
        {[0, 1, 2, 3, 4, 5,6,7,8,9,10].map((item, index) => (
          <Skeleton key={index} width="100%" variant="rounded" height={300} />
        ))}
        </Box>

        <Skeleton variant="rounded" width="100%" height={5}  />
      </Stack>

      <Skeleton variant="rounded" width={200} height={30} sx={{ marginTop: 'auto' }} />
    </Stack>
  );
}
