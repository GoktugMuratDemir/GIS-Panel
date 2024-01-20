import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import ListItemText from '@mui/material/ListItemText';

import ListItemButton from '@mui/material/ListItemButton';
// utils
import { Dialog } from '@mui/material';
import { useState } from 'react';
import { fDate } from 'src/utils/format-time';

import DetailMessage from './detail-message';

// ----------------------------------------------------------------------

export default function MessageItem({ notification, toggleReadStatusById }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);

  const handleCloseDialog = async () => {
    setDialogOpen(false);
  };

  const renderText = (
    <ListItemText
      disableTypography
      primary={reader(notification.content)}
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{
                width: 2,
                height: 2,
                bgcolor: 'currentColor',
                mx: 0.5,
                borderRadius: '50%',
              }}
            />
          }
        >
          {fDate(notification.sendDate)}
          {/* {notification.category} */}
        </Stack>
      }
    />
  );

  const renderUnReadBadge = !notification.isRead && (
    <Box
      sx={{
        top: 26,
        width: 8,
        height: 8,
        right: 20,
        borderRadius: '50%',
        bgcolor: 'info.main',
        position: 'absolute',
      }}
    />
  );

  return (
    <>
      <ListItemButton
        disableRipple
        sx={{
          p: 2.5,
          alignItems: 'flex-start',
          borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
        onClick={handleOpenDialog}
      >
        {renderUnReadBadge}

        <Stack sx={{ flexGrow: 1 }}>{renderText}</Stack>
      </ListItemButton>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md">
        <Stack p={5} position="relative">
          {/* <Button
            variant="outlined"
            color="inherit"
            sx={{ position: 'absolute', top: 40, right: 40, border: 'none' }}
            onClick={handleCloseDialog}
          >
            <Iconify icon="material-symbols:close" />
          </Button> */}
          <DetailMessage
            handleCloseDialog={handleCloseDialog}
            notification={notification}
            toggleReadStatusById={toggleReadStatusById}
          />
        </Stack>
      </Dialog>
    </>
  );
}

MessageItem.propTypes = {
  notification: PropTypes.object,
  toggleReadStatusById: PropTypes.func,
};

// ----------------------------------------------------------------------

function reader(data) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        '& p': { typography: 'body2', m: 0 },
        '& a': { color: 'inherit', textDecoration: 'none' },
        '& strong': { typography: 'subtitle2' },
      }}
    />
  );
}
