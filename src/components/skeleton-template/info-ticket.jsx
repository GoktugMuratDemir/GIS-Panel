import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

export default function InfoTicketSkeleton({ noButton }) {
  return (
    <Stack
      height={1}
      width={1}
      p={3}
      spacing={2.5}
      borderRadius={3}
      sx={{ background: 'rgba(196, 196, 196, 0.10)' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack width={1} spacing={1}>
          <Skeleton variant="text" width={250} height={20} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width={70} height={15} />
          </Box>
        </Stack>
        <Skeleton variant="circular" width={35} height={35} />
      </Box>

      <Skeleton variant="rounded" width={170} height={25} />
      {!noButton && <Skeleton variant="rounded" width={200} height={30} />}
    </Stack>
  );
}
