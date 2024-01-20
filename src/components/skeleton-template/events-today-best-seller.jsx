import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

export default function EventsTodayBestSellerLoading() {
  return (
    <Stack
      height={1}
      width={1}
      p={3}
      spacing={2.5}
      mb={2}
      borderRadius={3}
      sx={{ background: 'rgba(196, 196, 196, 0.10)' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb:3 }}>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={300} height={25} />
          <Skeleton variant="rounded" width={250} height={15} />
        </Stack>
        <Skeleton variant="circular" width={35} height={35} />
      </Box>

      <Stack spacing={2}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
          <Stack spacing={2} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack spacing={1}>
                <Skeleton variant="rounded" width={200} height={15} />
                <Skeleton variant="rounded" width={300} height={10} />
              </Stack>
              <Stack spacing={1} alignItems="flex-end">
                <Skeleton variant="rounded" width={100} height={15} />
                <Skeleton variant="rounded" width={200} height={10} />
              </Stack>
            </Box>

            <Skeleton variant="rounded" width="100%" height={7} />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Skeleton variant="rounded" width={100} height={15} />
              <Skeleton variant="rounded" width={100} height={10} />
            </Box>

            <Skeleton variant="rounded" width="100%" height={2} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
