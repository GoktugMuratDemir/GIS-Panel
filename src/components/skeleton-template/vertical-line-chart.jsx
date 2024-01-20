import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

export default function VerticalLineChartLoading() {
  return (
    <Stack
      height={1}
      width={1}
      p={3}
      mb={2}
      borderRadius={3}
      sx={{ background: 'rgba(196, 196, 196, 0.10)', display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      
    >
      <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton variant="rounded" width={300} height={25} />
        <Skeleton variant="circular" width={35} height={35} />
      </Box>

      {[0, 1, 2, 3, 4,5].map((item, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: "12px" }}>
             <Skeleton width="100%" variant="rounded" height={20} />
             <Skeleton width="100%" variant="rounded" height={40} />
        </Box>
      ))}

      </Stack>

        <Skeleton variant="rounded" width={200} height={30} sx={{marginTop: "auto"}} />
    </Stack>
  );
}
