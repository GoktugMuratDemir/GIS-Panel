import { Helmet } from 'react-helmet-async';
import FieldsAddEditView from 'src/sections/fields/fields-add-edit-view';
// sections

// ----------------------------------------------------------------------

export default function FieldsAddPage() {
  return (
    <>
      <Helmet>
        <title>Tarla Ekle</title>
      </Helmet>

      <FieldsAddEditView />
    </>
  );
}
