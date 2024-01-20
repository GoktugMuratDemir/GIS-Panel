/* eslint-disable react/prop-types */
import { Box, ListItemText, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { WebServices } from 'src/services/requests';
import { fToNow } from 'src/utils/format-time';

export default function DetailMessage({ handleCloseDialog, notification, toggleReadStatusById }) {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    const isForm = true;

    const sendData = {
      messageId: notification.messageId,
      accountId: '52340edb-ff7b-4daa-be6c-d05c292dbd12',
    };

    const response = await WebServices.updateReadMessage(sendData, isForm);
    // console.log('create category = ', response);
    if (response.success) {
      enqueueSnackbar('Mesaj Okundu');
      toggleReadStatusById(notification.messageId);
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
