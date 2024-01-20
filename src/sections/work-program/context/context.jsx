/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import { WebServices } from 'src/services/requests';

const RenderDataContext = createContext();

export function useRenderData() {
  return useContext(RenderDataContext);
}

export function RenderDataProvider({ children }) {
  const [resDataAll, setResDataAll] = useState(null);

  const { user } = useAuthContext();

  const isAdmin = user?.IsAdmin === 'True';

  //

  async function fetchAllData() {
    const { data } = await WebServices.getAllPrograms();
    setResDataAll(data?.data);
  }

  async function fetchAllDataForUser() {
    const { data } = await WebServices.getAllProgramsForUser({
      Id: user?.AccountId,
    });
    setResDataAll(data?.data);
  }

  // console.log(user);
  useEffect(() => {
    if (!isAdmin) {
      fetchAllDataForUser();
    } else {
      fetchAllData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    resDataAll,
    setResDataAll,
    fetchAllData,
  };

  return <RenderDataContext.Provider value={value}>{children}</RenderDataContext.Provider>;
}
