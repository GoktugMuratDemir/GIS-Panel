// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useLocales } from 'src/locales';
import Welcome from '../welcome';
import Events from '../events';

// ----------------------------------------------------------------------

export default function HomeWiew() {
  const settings = useSettingsContext();
  const { t } = useLocales();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('home')}
        links={[{ name: t('home') }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Welcome />

      <Events />
    </Container>
  );
}
