/* eslint-disable react/prop-types */
import { Box, ListItemText, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import { WebServices } from 'src/services/requests';
import { fToNow } from 'src/utils/format-time';

export default function DetailDialog({ handleCloseDialog, notification, toggleReadStatusById }) {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const onSubmit = async (data) => {
    const isForm = true;

    const sendData = {
      notificationId: notification.notificationId,
      accountId: user?.AccountId,
    };

    const response = await WebServices.updateReadNotification(sendData, isForm);
    // console.log('create category = ', response);
    if (response.success) {
      enqueueSnackbar('Bildirim Okundu');
      toggleReadStatusById(notification.notificationId);
      await new Promise((resolve) => setTimeout(resolve, 200));
      // await navigate(paths.dashboard.fields.root);
      // handleCloseDialog();
    } else {
      enqueueSnackbar('Hatalı İşlem', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    if (notification.isRead === false) {
      onSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <ListItemText
        disableTypography
        primary={reader(notification?.content)}
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
            {fToNow(notification?.sendDate)}
          </Stack>
        }
      />
    </Stack>
  );
}

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
