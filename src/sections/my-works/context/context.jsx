/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from 'react';
// import { WebServices } from 'src/services/requests';

const RenderDataContext = createContext();

export function useRenderData() {
  return useContext(RenderDataContext);
}

export function RenderDataProvider({ children }) {
  const [resDataAll, setResDataAll] = useState(_tempWorks);

  async function fetchAllData() {
    // const { data } = await WebServices.getAllSliders();
    // setResDataAll(data?.data);
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  const value = {
    resDataAll,
    setResDataAll,
    fetchAllData,
  };

  return <RenderDataContext.Provider value={value}>{children}</RenderDataContext.Provider>;
}

const _tempWorks = [
  {
    id: 1,
    worker: 'Mehmet Yasmin',
    fieldName: 'Buğday Tarlası',
    description: 'Buğday tarlası taranacak',
    workDay: '3',
    contactNo: '5418627425',

    workerLocation: 'lat lang değeleri',
  },
  {
    id: 2,
    worker: 'Ahmet Can',
    fieldName: 'Mısır Tarlası',
    description: 'Mısır tarlası sulanacak',
    workDay: '5',
    contactNo: '5421234567',

    workerLocation: 'lat lang değeleri',
  },
  {
    id: 3,
    worker: 'Fatma Kaya',
    fieldName: 'Patates Tarlası',
    description: 'Patates tarlası gübrelenmeli',
    workDay: '2',
    contactNo: '5439876543',

    workerLocation: 'lat lang değeleri',
  },
  {
    id: 4,
    worker: 'Ali Tekin',
    fieldName: 'Üzüm Bağı',
    description: 'Üzüm bağı hasat edilecek',
    workDay: '4',
    contactNo: '5447890123',

    workerLocation: 'lat lang değeleri',
  },
  {
    id: 5,
    worker: 'Ayşe Yılmaz',
    fieldName: 'Elma Bahçesi',
    description: 'Elma bahçesi sulanacak',
    workDay: '1',
    contactNo: '5452345678',
    workerLocation: 'lat lang değeleri',
  },
];
