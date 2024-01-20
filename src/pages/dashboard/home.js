import { Helmet } from 'react-helmet-async';
// sections
import HomeWiev from 'src/sections/home/view/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Ana Sayfa</title>
      </Helmet>

      {/* empty */}

      <HomeWiev />
    </>
  );
}
