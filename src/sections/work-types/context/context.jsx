/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { WebServices } from 'src/services/requests';

const RenderDataContext = createContext();

export function useRenderData() {
  return useContext(RenderDataContext);
}

export function RenderDataProvider({ children }) {
  const [resDataAll, setResDataAll] = useState(null);

  async function fetchAllData() {
    const { data } = await WebServices.getAllWorkTypes();
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
