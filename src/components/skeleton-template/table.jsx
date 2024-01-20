/* eslint-disable react/prop-types */
import { Box, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

export default function TableLoading({ isReport }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const array = isMobile ? [0, 1, 2, 3] : [0, 1, 2, 3, 4, 5, 6];

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
      {isReport ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            gap: 2,
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{ flex: isMobile ? 5 : 1 }}
            width="100%"
            height={25}
          />
          <Skeleton variant="rectangular" sx={{ flex: 30 }} width="100%" height={25} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Stack spacing={1}>
            <Skeleton variant="rounded" width={300} height={25} />
            <Skeleton variant="rounded" width={150} height={15} />
          </Stack>
          <Skeleton variant="circular" width={35} height={35} />
        </Box>
      )}

      {array.map((column, colIndex) => (
        <Box
          key={colIndex}
          spacing={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {array.map((row, rowIndex) => (
            <Skeleton
              key={rowIndex}
              variant="rectangular"
              width="100%"
              height={25}
              sx={{ mb: 1 }}
            />
          ))}
        </Box>
      ))}
    </Stack>
  );
}
