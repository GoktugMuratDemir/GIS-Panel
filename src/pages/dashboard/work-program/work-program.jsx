import { Helmet } from 'react-helmet-async';
import { RenderDataProvider } from 'src/sections/work-program/context/context';
import WorkProgramView from 'src/sections/work-program/work-program-view';
// sections

// ----------------------------------------------------------------------

export default function WorkProgramPage() {
  return (
    <>
      <Helmet>
        <title>İş Programı</title>
      </Helmet>

      <RenderDataProvider>
        <WorkProgramView />
      </RenderDataProvider>
    </>
  );
}
