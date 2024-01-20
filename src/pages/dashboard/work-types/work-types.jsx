import { Helmet } from 'react-helmet-async';
import WorkTypesView from 'src/sections/work-types/work-types-view';
import { RenderDataProvider } from 'src/sections/work-types/context/context';
// sections

// ----------------------------------------------------------------------

export default function WorkTypesPage() {
  return (
    <>
      <Helmet>
        <title>İş Tipleri</title>
      </Helmet>

      <RenderDataProvider>
        <WorkTypesView />
      </RenderDataProvider>
    </>
  );
}
