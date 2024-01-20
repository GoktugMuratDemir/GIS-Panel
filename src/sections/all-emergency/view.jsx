// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import TableLoading from 'src/components/skeleton-template/table';

import { useRenderData } from './context/context';
import AllEmergencyList from './list/list';

// ----------------------------------------------------------------------

export default function AllEmergencyView() {
  const settings = useSettingsContext();

  const { resDataAll } = useRenderData();

  // console.log('Tüm ÇALIŞANLAR .... ', resDataAll);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Acil Durumlar"
        links={[{ name: 'Ana Sayfa' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {resDataAll ? <AllEmergencyList /> : <TableLoading />}
    </Container>
  );
}
