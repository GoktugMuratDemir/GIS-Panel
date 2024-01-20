import React from 'react';
import Paper from '@mui/material/Paper';
import { Typography, Avatar, useTheme } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { useLocales } from 'src/locales';

export default function Welcome() {
  const theme = useTheme();
  const { t } = useLocales();

  const { user } = useAuthContext();
  // console.log(user);
  const userName = `${user?.name} ${user?.family_name}`;
  return (
    <Paper
      variant="contained"
      sx={{
        px: 3,
        py: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.palette.success[500],
      }}
    >
      <Typography
        variant="h4"
        sx={{
          [theme.breakpoints.down('md')]: {
            fontSize: '16px',
          },
        }}
        fontWeight="500"
      >
        {t('welcome')} {userName}!
      </Typography>
      <Avatar
        variant="square"
        src="/assets/illustrations/Welcome.svg"
        alt=""
        sx={{
          width: 250,
          height: 170,
          [theme.breakpoints.down('md')]: {
            width: 120,
            height: 70,
          },
        }}
      />
    </Paper>
  );
}
