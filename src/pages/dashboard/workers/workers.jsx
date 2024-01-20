import { Helmet } from 'react-helmet-async';
import { RenderDataProvider } from 'src/sections/workers/context/context';
import WorkersView from 'src/sections/workers/workers-view';
// sections

// ----------------------------------------------------------------------

export default function MyWorksPage() {
  return (
    <>
      <Helmet>
        <title>İşçiler</title>
      </Helmet>

      <RenderDataProvider>
        <WorkersView />
      </RenderDataProvider>
    </>
  );
}
