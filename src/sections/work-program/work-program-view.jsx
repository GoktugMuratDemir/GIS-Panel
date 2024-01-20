// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import TableLoading from 'src/components/skeleton-template/table';
import WorkProgramList from './list/list';
import { useRenderData } from './context/context';

// ----------------------------------------------------------------------

export default function WorkProgramView() {
  const settings = useSettingsContext();

  const { resDataAll } = useRenderData();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="İş Programı"
        links={[{ name: 'Ana Sayfa' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {resDataAll ? <WorkProgramList /> : <TableLoading />}
    </Container>
  );
}
