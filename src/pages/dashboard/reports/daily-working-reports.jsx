import React from 'react';
import { Helmet } from 'react-helmet-async';
import { RenderDataProvider } from 'src/sections/daily-working-report/context/context';
import DailyWoringReportView from 'src/sections/daily-working-report/view';

export default function DailyWorkingReports() {
  return (
    <>
      <Helmet>
        <title>Günlük Konum Raporu</title>
      </Helmet>

      <RenderDataProvider>
        <DailyWoringReportView />
      </RenderDataProvider>
    </>
  );
}
