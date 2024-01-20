import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

export default function EventsCardsListLoading({ noHeader }) {
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
            spacing={3}
            sx={{
              background: 'rgba(196, 196, 196, 0.10)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Stack spacing={5}>
                <Stack spacing={2}>
                  <Skeleton variant="rounded" width={250} height={20} />
                  <Skeleton variant="rounded" width={120} height={10} />
                </Stack>

                <Stack spacing={2}>
                  <Skeleton variant="rounded" width={250} height={15} />
                  <Skeleton variant="rounded" width={120} height={10} />
                </Stack>
              </Stack>
              <Skeleton variant="rounded" width={120} height={20} />
            </Box>

            <Stack spacing={1}>
                <Skeleton variant="rounded" width="100%" height={10} />
                <Box sx={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between"
                }}>
                    <Skeleton variant="rounded" width={100} height={10} />
                    <Skeleton variant="rounded" width={100} height={10} />
                </Box>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </>
  );
}
