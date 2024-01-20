import { Helmet } from 'react-helmet-async';
import { RenderDataProvider } from 'src/sections/my-works/context/context';
import WorksView from 'src/sections/my-works/works-view';
// sections

// ----------------------------------------------------------------------

export default function MyWorksPage() {
  return (
    <>
      <Helmet>
        <title>İşlerim</title>
      </Helmet>

      <RenderDataProvider>
        <WorksView />
      </RenderDataProvider>
    </>
  );
}
