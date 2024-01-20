import { Helmet } from 'react-helmet-async';
import { RenderDataProvider } from 'src/sections/workers/context/context';
import WorkerAddEditView from 'src/sections/workers/worker-add-edit-view';
// sections

// ----------------------------------------------------------------------

export default function WorkerAddPage() {
  return (
    <>
      <Helmet>
        <title>İşçi Ekle</title>
      </Helmet>

      <RenderDataProvider>
        <WorkerAddEditView />
      </RenderDataProvider>
    </>
  );
}
