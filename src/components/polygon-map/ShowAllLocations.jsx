/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polygon } from '@react-google-maps/api';
import _ from 'lodash';
import { useLocationData } from 'src/auth/context/auth-location';
import { useRenderData } from 'src/sections/daily-working-report/context/context';

const containerStyle = {
  width: '100%',
  height: '500px',
};

// uludağ üni locasyonları
// const center = {
//   lat: 40.218899,
//   lng: 28.870001,
// };

export default function ShowAllLocations() {
  const { currentCenter, isLocationPermissionGranted } = useLocationData();
  const { resDataAll } = useRenderData();
  const [defaultCoords, setDefaultCoords] = useState([]);
  const [defaultIdFieldCenter, setDefaultIdFieldCenter] = useState(null);

  console.log(defaultCoords);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  useEffect(() => {
    // console.log(navigator.geolocation);
    // const { lat, lng } = currentCenter;

    const formatCoords = resDataAll.map((item, index) => ({
      lat: item.latitude,
      lng: item.longitude,
    }));
    setDefaultCoords(formatCoords);

    const latitudes = _.map(resDataAll, 'latitude');
    const longitudes = _.map(resDataAll, 'longitude');

    // Ortalama alma
    const centerLatitude = _.mean(latitudes);
    const centerLongitude = _.mean(longitudes);

    setDefaultIdFieldCenter({
      lat: centerLatitude,
      lng: centerLongitude,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCenter]);

  // eslint-disable-next-line no-shadow
  const onLoad = React.useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds(currentCenter);
      map.fitBounds(bounds);
    },
    [currentCenter]
  );

  const onUnmount = React.useCallback(() => {
    // setMap(null);
  }, []);

  // console.log(defaultIdFieldCenter);

  //   const uniqueData = _.uniqWith(resDataAll, _.isEqual);
  //   console.log('uniq ', resDataAll && uniqueData);

  const temp_center = {
    lat: 40.2259968,
    lng: 28.8751616,
  };

  // Dörtgenin kenar uzunlukları
  const edgeLength1 = 0.0002; // Dikey kenar uzunluğu
  const edgeLength2 = 0.0007; // Yatay kenar uzunluğu

  const temp_locations = [
    { lat: temp_center.lat + edgeLength1 / 2.4, lng: temp_center.lng - edgeLength2 / 1.2 },
    { lat: temp_center.lat + edgeLength1 / 0.5, lng: temp_center.lng + edgeLength2 / 1.4 },
    { lat: temp_center.lat - edgeLength1 / 1.6, lng: temp_center.lng + edgeLength2 / 5.6 },
    { lat: temp_center.lat - edgeLength1 / 1.7, lng: temp_center.lng - edgeLength2 / 3 },
  ];

  const marker_locations = [
    { lat: temp_center.lat + edgeLength1 / 2.4, lng: temp_center.lng - edgeLength2 / 2.2 },
    { lat: temp_center.lat + edgeLength1 / 1.5, lng: temp_center.lng + edgeLength2 / 3.4 },
    { lat: temp_center.lat - edgeLength1 / 10.6, lng: temp_center.lng + edgeLength2 / 9.6 },
    { lat: temp_center.lat - edgeLength1 / 9.7, lng: temp_center.lng - edgeLength2 / 3.2 },
  ];

  // console.log(currentCenter);

  return (
    <>
      {isLocationPermissionGranted && currentCenter !== null && defaultIdFieldCenter !== null ? (
        isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={temp_center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {marker_locations.map((item, index) => (
              <Marker
                key={index}
                icon={{
                  path: 'M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64',
                  fillColor: 'blue', // Change the fill color here
                  fillOpacity: 1,
                  scale: 0.05,
                }}
                position={item}
              />
            ))}

            <Polygon
              paths={temp_locations}
              options={{
                fillColor: '#aea2db',
                fillOpacity: 0.35,
                strokeColor: '#3407e8',
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />
          </GoogleMap>
        ) : (
          <></>
        )
      ) : (
        <h1>Lütfen Konum İznini Onaylayınız</h1>
      )}
    </>
  );
}
