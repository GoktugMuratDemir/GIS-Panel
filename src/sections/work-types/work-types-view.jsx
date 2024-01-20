// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import TableLoading from 'src/components/skeleton-template/table';
import WorkTypesList from './list/list';
import { useRenderData } from './context/context';

// ----------------------------------------------------------------------

export default function WorkTypesView() {
  const settings = useSettingsContext();

  const { resDataAll } = useRenderData();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="İş Tipleri"
        links={[{ name: 'Ana Sayfa' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {resDataAll ? <WorkTypesList /> : <TableLoading />}
    </Container>
  );
}
