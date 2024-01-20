import { Helmet } from 'react-helmet-async';
import { RenderDataProvider } from 'src/sections/fields/context/context';
import FieldsView from 'src/sections/fields/fields-view';
// sections

// ----------------------------------------------------------------------

export default function FieldsPage() {
  return (
    <>
      <Helmet>
        <title>Tarlalarım</title>
      </Helmet>

      <RenderDataProvider>
        <FieldsView />
      </RenderDataProvider>
    </>
  );
}
