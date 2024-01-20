import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

export default function FilmInfoCardLoading() {
  return (
    <Stack
      height={1}
      maxHeight={200}
      width={1}
      p={3}
      spacing={2.5}
      borderRadius={3}
      sx={{ background: 'rgba(196, 196, 196, 0.10)' }}
    >
      <Box sx={{display: "flex",alignItems:"center", gap:2}}>
        <Skeleton variant="rounded" width={70} height={120} />
        <Stack spacing={4} width="100%">
            <Skeleton variant="rounded" width="70%" height={25} />
            <Box sx={{display:"flex",justifyContent:"space-between", alignItems:"center", width:"100%", gap:2}}>
                {
                    [0,1,2].map((item,index)=>(
                        <Stack key={index} spacing={1} sx={{flex:1}} width="100%">
                            <Skeleton variant="rounded" width="100%" height={20} />
                            <Skeleton variant="rounded" width="100%" height={20} />
                        </Stack>
                    ))
                }
            </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
