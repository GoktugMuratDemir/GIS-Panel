import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function MapLoading({isSmall}) {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <  Skeleton variant="rounded" width={300} height={25} />
        <Skeleton variant="circular" width={35} height={35} />
      </Box>

      <Skeleton variant="rounded" width="100%" height={isSmall ? 70 : 340} />
     
    </Stack>
  )
}
