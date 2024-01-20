/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState } from 'react';
import { WebServices } from 'src/services/requests';
// import { WebServices } from 'src/services/requests';

const RenderDataContext = createContext();

export function useRenderData() {
  return useContext(RenderDataContext);
}

export function RenderDataProvider({ children }) {
  const [resDataAll, setResDataAll] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state

  async function fetchAllData(params) {
    try {
      setIsLoading(true); // Set isLoading to true when starting the data fetch
      const data = await WebServices.getFilterReport(params);
      setResDataAll(data.response.data.data);
    } finally {
      setIsLoading(false); // Set isLoading back to false after data fetch completes (whether successful or not)
    }
  }

  const value = {
    resDataAll,
    setResDataAll,
    fetchAllData,
    isLoading,
  };

  return <RenderDataContext.Provider value={value}>{children}</RenderDataContext.Provider>;
}
