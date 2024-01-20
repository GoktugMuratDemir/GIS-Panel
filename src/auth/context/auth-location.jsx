/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { WebServices } from 'src/services/requests';
import { useAuthContext } from '../hooks';

const RenderDataContext = createContext();

export function useLocationData() {
  return useContext(RenderDataContext);
}

export function AuthLocationProvider({ children }) {
  const [currentCenter, setCurrentCenter] = useState(null);
  const [isLocationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const { user } = useAuthContext();

  // useEffect(() => {
  //   // console.log(navigator.geolocation);
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       setCurrentCenter({ lat: latitude, lng: longitude });
  //       setLocationPermissionGranted(true);
  //     });
  //   } else {
  //     console.log('Tarayıcı konum hizmetlerini desteklemiyor.');
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setCurrentCenter({ lat: latitude, lng: longitude });
          setLocationPermissionGranted(true);
          // console.log('anlık konum alma çalıştı');
        });
      } else {
        console.log('Tarayıcı konum hizmetlerini desteklemiyor.');
      }
    };

    // Get current location when the component mounts
    getCurrentLocation();

    // Set up interval to update location every 5 minutes
    const intervalId = setInterval(() => {
      getCurrentLocation();
      // console.log('konum gönderme çalıştı');
    }, 300000);
    // 25000

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // başlangıçta ilk isteği atması için
    if (user) {
      postLiveActionLocation();
    }

    const intervalId = setInterval(() => {
      if (user) {
        postLiveActionLocation();
      }
    }, 300000);
    // 300000
    // 10000

    // Component unmount olduğunda setInterval'ı temizleme
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function postLiveActionLocation() {
    if (currentCenter) {
      const isForm = false;
      const nowTime = new Date();
      const sendParams = {
        accountId: user?.AccountId,
        longitude: currentCenter?.lng,
        latitude: currentCenter?.lat,
        createDate: nowTime.toISOString(),
      };

      // console.log('istek atıldı', sendParams, isForm);
      const response = await WebServices.PostLiveAction(sendParams, isForm);
      console.log('' || response);
      // console.log(response);
    } else {
      console.log('currentCenter değeri null olduğu için istek gönderilemedi.');
    }
  }

  const value = {
    currentCenter,
    setCurrentCenter,
    isLocationPermissionGranted,
    setLocationPermissionGranted,
  };

  return <RenderDataContext.Provider value={value}>{children}</RenderDataContext.Provider>;
}
