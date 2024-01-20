import React from 'react';
// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import WorkTypesAddEditForm from './add-edit/work-types-add-edit-form';

export default function WorkTypesAddEditView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="İş Tipi Ekle Düzenle"
        links={[{ name: 'Ana Sayfa' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <WorkTypesAddEditForm />
    </Container>
  );
}
