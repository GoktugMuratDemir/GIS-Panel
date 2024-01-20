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
  const [resDataAllWorkers, setResDataAllWorkers] = useState(null);

  async function fetchAllData() {
    const { data } = await WebServices.getAllEmergency();
    setResDataAll(data?.data);
  }

  async function fetchAllWorkers() {
    const { data } = await WebServices.getAllWorkers();
    setResDataAllWorkers(data?.data);
  }

  useEffect(() => {
    fetchAllData();
    fetchAllWorkers();
  }, []);

  const value = {
    resDataAll,
    setResDataAll,
    fetchAllData,
    resDataAllWorkers,
  };

  return <RenderDataContext.Provider value={value}>{children}</RenderDataContext.Provider>;
}
