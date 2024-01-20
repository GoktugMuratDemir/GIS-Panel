import { Helmet } from 'react-helmet-async';
import { RenderDataProvider } from 'src/sections/work-program/context/context';
import WorkProgramAddEditView from 'src/sections/work-program/work-program-add-edit-view';
// sections

// ----------------------------------------------------------------------

export default function WorkProgramEditPage() {
  return (
    <>
      <Helmet>
        <title>İş Programı Düzenle</title>
      </Helmet>

      <RenderDataProvider>
        <WorkProgramAddEditView />
      </RenderDataProvider>
    </>
  );
}
