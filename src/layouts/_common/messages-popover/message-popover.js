import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
// @mui

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// hooks
import { Dialog } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
// import { _notifications } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';
//
import { WebServices } from 'src/services/requests';
import { useAuthContext } from 'src/auth/hooks';
import NotificationItem from './message-item';
import NewMessageForm from './new-message-form';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function MessagesPopover() {
  const drawer = useBoolean();

  const [dialogOpen, setDialogOpen] = useState(false);

  const { user } = useAuthContext();

  const handleOpenDialog = () => setDialogOpen(true);

  const handleCloseDialog = async () => {
    setDialogOpen(false);
  };

  const smUp = useResponsive('up', 'sm');

  const [notifications, setNotifications] = useState([]);

  async function fetchAllDataNotifications() {
    const { data } = await WebServices.getMessageById({
      Id: user?.AccountId,
    });
    setNotifications(data?.data);
  }

  useEffect(() => {
    // İlk çağrıyı yap
    fetchAllDataNotifications();

    // Her dakika bir çağrı yapmak için interval oluştur
    const intervalId = setInterval(() => {
      fetchAllDataNotifications();
    }, 60000);

    // Compnent unmount edildiğinde interval'i temizle
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalUnRead = notifications?.filter((item) => item.isRead === false).length;

  const toggleReadStatusById = (id) => {
    console.log(id);
    setNotifications(
      notifications?.map((notification) => {
        if (notification.messageId === id && notification.isRead === false) {
          return {
            ...notification,
            isRead: !notification.isRead,
          };
        }
        return notification;
      })
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications?.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Mesajlar
      </Typography>

      {!!totalUnRead && (
        <Tooltip title="Mark all as read">
          <IconButton color="primary" onClick={handleMarkAllAsRead}>
            <Iconify icon="eva:done-all-fill" />
          </IconButton>
        </Tooltip>
      )}

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {notifications?.map((notification) => (
          <NotificationItem
            key={notification.messageId}
            notification={notification}
            toggleReadStatusById={toggleReadStatusById}
          />
        ))}
      </List>
    </Scrollbar>
  );

  const createNewMessage = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Button variant="outlined" fullWidth color="primary" onClick={handleOpenDialog}>
        Yeni Mesaj Oluştur
      </Button>
    </Stack>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={drawer.value ? 'primary' : 'default'}
        onClick={drawer.onTrue}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:message-square-fill" width={24} />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />

        {createNewMessage}

        <Divider />

        {renderList}
      </Drawer>

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
          <NewMessageForm handleCloseDialog={handleCloseDialog} />
        </Stack>
      </Dialog>
    </>
  );
}
