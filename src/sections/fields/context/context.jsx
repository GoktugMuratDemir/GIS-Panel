/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { WebServices } from 'src/services/requests';
// import { WebServices } from 'src/services/requests';

const RenderDataContext = createContext();

export function useRenderData() {
  return useContext(RenderDataContext);
}

export function RenderDataProvider({ children }) {
  const [resDataAll, setResDataAll] = useState(null);

  async function fetchAllData() {
    const { data } = await WebServices.getAllFields();
    setResDataAll(data?.data);
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

// const _tempFields = [
//   {
//     id: 1,
//     title: 'Buğday Tarlası',
//     description: 'Verimli buğday ekimi yapılan tarla.',
//   },
//   {
//     id: 2,
//     title: 'Mısır Tarlası',
//     description: 'Yüksek kaliteli mısır üretimi için uygun tarla.',
//   },
//   {
//     id: 3,
//     title: 'Pamuk Tarlası',
//     description: 'Pamuk yetiştirmek için ideal tarla alanı.',
//   },
//   {
//     id: 4,
//     title: 'Elma Bahçesi',
//     description: 'Lezzetli elma ağaçlarıyla dolu bir bahçe.',
//   },
//   {
//     id: 5,
//     title: 'Üzüm Bağı',
//     description: 'Kaliteli şarap üzümü yetiştirmek için kullanılan bağ.',
//   },
//   {
//     id: 6,
//     title: 'Domates Tarlası',
//     description: 'Taze ve organik domates üretimine uygun tarla.',
//   },
// ];
