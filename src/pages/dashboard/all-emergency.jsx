import React from 'react';
import { Helmet } from 'react-helmet-async';
import { RenderDataProvider } from 'src/sections/all-emergency/context/context';
import AllEmergencyView from 'src/sections/all-emergency/view';

export default function AllEmergency() {
  return (
    <>
      <Helmet>
        <title>Acil Durumlar</title>
      </Helmet>

      <RenderDataProvider>
        <AllEmergencyView />
      </RenderDataProvider>
    </>
  );
}
