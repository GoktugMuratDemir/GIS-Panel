/* eslint-disable no-nested-ternary */
// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import TableLoading from 'src/components/skeleton-template/table';

import { useRenderData } from './context/context';
import DailyReportResult from './result/result';
import FilterForm from './filter-form/filter-form';

// ----------------------------------------------------------------------

export default function DailyWoringReportView() {
  const settings = useSettingsContext();

  const { resDataAll, isLoading } = useRenderData();

  // console.log('Tüm ÇALIŞANLAR .... ', resDataAll);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Günlük Konum Raporu"
        links={[{ name: 'Ana Sayfa' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FilterForm />

      {isLoading ? (
        <TableLoading />
      ) : resDataAll === null ? (
        <h1>Filtreleme Yapınız</h1>
      ) : (
        <DailyReportResult />
      )}
    </Container>
  );
}
