import { Helmet } from 'react-helmet-async';
import WorkTypesAddEditView from 'src/sections/work-types/work-types-add-edit-view';
import { RenderDataProvider } from 'src/sections/work-types/context/context';
// sections

// ----------------------------------------------------------------------

export default function WorkTypesAddPage() {
  return (
    <>
      <Helmet>
        <title>İş Tipleri Ekle</title>
      </Helmet>

      <RenderDataProvider>
        <WorkTypesAddEditView />
      </RenderDataProvider>
    </>
  );
}
