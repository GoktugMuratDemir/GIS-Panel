import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

export default function CardsListLoading({ noHeader }) {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => (
        <Stack spacing={3} key={index}>
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
              position:'relative',
            }}
          >
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Stack spacing={2}>
                {!noHeader && (
                  <>
                    <Skeleton variant="rounded" width={300} height={30} />
                    <Skeleton variant="rounded" width={120} height={15} />
                  </>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Skeleton variant="rounded" width={90} height={120} />
                  <Stack spacing={1}>
                    <Skeleton variant="rounded" width={200} height={25} />
                    <Skeleton variant="rounded" width={70} height={15} />
                  </Stack>
                </Box>
              </Stack>
              <Stack spacing={1} alignItems="flex-start">
                <Skeleton variant="rounded" width={120} height={20} />
                <Skeleton variant="rounded" width={170} height={25} />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      ))}
    </>
  );
}
