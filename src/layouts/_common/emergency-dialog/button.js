import { m } from 'framer-motion';
// @mui
import IconButton from '@mui/material/IconButton';
// locales

// components
import { Dialog, Stack } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import FormDialog from './form-dialog';

// ----------------------------------------------------------------------

export default function EmergencyDialogButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);

  const handleCloseDialog = async () => {
    setDialogOpen(false);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={handleOpenDialog}
        sx={{
          width: 40,
          height: 40,
          ...(dialogOpen && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <Iconify
          icon="material-symbols:emergency-home"
          width={50}
          sx={{ borderRadius: 0.65, p: 0, color: (theme) => theme.palette.error.main }}
        />
      </IconButton>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="xl">
        <Stack p={5} position="relative">
          {/* <Button
            variant="outlined"
            color="inherit"
            sx={{ position: 'absolute', top: 40, right: 40, border: 'none' }}
            onClick={handleCloseDialog}
          >
            <Iconify icon="material-symbols:close" />
          </Button> */}
          <FormDialog handleCloseDialog={handleCloseDialog} />
        </Stack>
      </Dialog>
    </>
  );
}
