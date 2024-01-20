import { Skeleton, Stack } from '@mui/material';
import React from 'react';

export default function InfoNameLoading() {
  return (
    <Stack
      height={1}
      maxHeight={100}
      width={1}
      mb={5}
      //   p={3}
      spacing={1}
      borderRadius={3}
      //   sx={{ background: 'rgba(196, 196, 196, 0.10)' }}
    >
      <Skeleton variant="rounded" width={120} height={20} />
      <Stack direction="row" spacing={1}>
        <Skeleton variant="rounded" width={70} height={10} />
        <Skeleton variant="rounded" width={70} height={10} />
        <Skeleton variant="rounded" width={70} height={10} />
      </Stack>
    </Stack>
  );
}
