import React from 'react';
import ShowAllLocations from 'src/components/polygon-map/ShowAllLocations';
import { useRenderData } from '../context/context';

export default function DailyReportResult() {
  const { resDataAll } = useRenderData();
  // console.log(resDataAll);
  return (
    <>{resDataAll?.length === 0 ? <h1>Gösterilecek İçerik Bulunamadı</h1> : <ShowAllLocations />}</>
  );
}
