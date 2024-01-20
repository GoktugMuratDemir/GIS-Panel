import { Helmet } from 'react-helmet-async';
import { RenderDataProvider } from 'src/sections/my-works/context/context';
import MyWorksAddEditView from 'src/sections/my-works/works-add-edit-view';
// sections

// ----------------------------------------------------------------------

export default function MyWorksAddPage() {
  return (
    <>
      <Helmet>
        <title>Çalışmalarım Düzenle</title>
      </Helmet>

      <RenderDataProvider>
        <MyWorksAddEditView />
      </RenderDataProvider>
    </>
  );
}
