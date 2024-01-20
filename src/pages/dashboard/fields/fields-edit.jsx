import { Helmet } from 'react-helmet-async';
import FieldsAddEditView from 'src/sections/fields/fields-add-edit-view';
// sections

// ----------------------------------------------------------------------

export default function FieldsEditPage() {
  return (
    <>
      <Helmet>
        <title>Tarla Düzenle</title>
      </Helmet>

      <FieldsAddEditView />
    </>
  );
}
