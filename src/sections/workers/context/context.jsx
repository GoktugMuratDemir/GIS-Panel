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
    const { data } = await WebServices.getAllWorkers();

    // console.log(data);
    setResDataAll(data?.data);
  }

  // console.log(resDataAll);

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

// const _tempWorkers = [
//   {
//     id: 1,
//     nameSurname: 'Sude Verimli',
//     work: 'Sulama yapacak',
//     workDesc: 'Sulamalar buğday tarlasında yapılacak',
//     workField: 'Buğday Tarlası',
//     workLoc: 'B24C45',
//   },
//   {
//     id: 2,
//     nameSurname: 'Ahmet Yıldız',
//     work: 'Hasat yapacak',
//     workDesc: 'Hasat zamanı geldi, buğdayları toplamak için işe alındı',
//     workField: 'Buğday Tarlası',
//     workLoc: 'A12D34',
//   },
//   {
//     id: 3,
//     nameSurname: 'Ayşe Demir',
//     work: 'Toprak işleme yapacak',
//     workDesc: 'Toprak hazırlığı için traktör kullanacak',
//     workField: 'Mısır Tarlası',
//     workLoc: 'C56E78',
//   },
//   {
//     id: 4,
//     nameSurname: 'Mehmet Kara',
//     work: 'Gübreleme yapacak',
//     workDesc: 'Tarlayı gübreleyerek verimi artırmak için görevlendirildi',
//     workField: 'Mısır Tarlası',
//     workLoc: 'D90F12',
//   },
//   {
//     id: 5,
//     nameSurname: 'Zeynep Aktaş',
//     work: 'Ilıman iklim bitkileri ekimine katılacak',
//     workDesc: 'Ilıman iklim bitkilerinin ekim ve bakım işlemlerine destek olacak',
//     workField: 'Bahçe',
//     workLoc: 'E34G56',
//   },
// ];
