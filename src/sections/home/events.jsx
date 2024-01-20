import React from 'react';
import { Grid, Paper, Avatar, Typography, Stack, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router';

// import MemberAdd from 'src/components/_UI/members/add-edit';
import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';

export default function Events() {
  const navigate = useNavigate();

  const { t } = useLocales();

  const { user } = useAuthContext();
  const isAdmin = user?.IsAdmin === 'True';

  const CARDS = [
    {
      id: 1,
      title: t('profile'),
      subtitle: t('profile_info'),
      img: '/assets/illustrations/home/profile.svg',
      path: paths.dashboard.profile,
      forAdmin: false,
    },
    {
      id: 2,
      title: t('Workers'),
      subtitle: t('show_workers'),
      img: '/assets/illustrations/home/workers.svg',
      path: paths.dashboard.workers.root,
      forAdmin: true,
    },
    {
      id: 3,
      title: t('my_works'),
      subtitle: t('show_works'),
      img: '/assets/illustrations/home/works.svg',
      path: paths.dashboard.myWorks.root,
      forAdmin: false,
    },
    {
      id: 4,
      title: t('fields'),
      subtitle: t('show_fields'),
      img: '/assets/illustrations/home/fields.svg',
      path: paths.dashboard.fields.root,
      forAdmin: true,
    },
  ];

  return (
    <Grid container spacing={2} mt={3}>
      {CARDS.map((item) =>
        (item.forAdmin && isAdmin) || !item.forAdmin ? (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={4}>
            <Paper variant="contained">
              <Stack spacing={2} py={2}>
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                  <Avatar
                    variant="circular"
                    src={item.img}
                    alt={item.title}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Typography variant="h4">{item.title}</Typography>
                  <Typography variant="caption">{item.subtitle}</Typography>
                </Stack>
                <Divider variant="fullWidth" orientation="horizontal" />
                <Stack flexDirection="row" justifyContent="center" spacing={2}>
                  <Button variant="text" color="inherit" onClick={() => navigate(item.path)}>
                    {t('show')}
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ) : null
      )}
    </Grid>
  );
}
