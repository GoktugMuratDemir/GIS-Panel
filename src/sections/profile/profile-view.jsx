// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import ProfileEditForm from './edit/edit';
// ----------------------------------------------------------------------

export default function ProfileView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Profil"
        links={[{ name: 'Ana Sayfa', href: paths.dashboard.root }, { name: 'Profil' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProfileEditForm resDataAll={_tempData} />
    </Container>
  );
}

const _tempData = {
  id: 1,
  nameSurname: 'Mehmet Erdemli',
  bloodType: 'B Rh+',
  bornDate: '2000-09-13T18:35:51.000Z',
  telNo: '5413680445',
  emergencyTelNo: '5053255557',
  userType: 'Yönetici',
  profilImg:
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
};
