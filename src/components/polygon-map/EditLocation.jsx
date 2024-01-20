/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { GoogleMap, useJsApiLoader, Polygon, Marker } from '@react-google-maps/api';
import { useParams } from 'react-router';
import { Stack, Button } from '@mui/material';
import { useLocationData } from 'src/auth/context/auth-location';

const containerStyle = {
  width: '100%',
  height: '500px',
};

// uludağ üni locasyonları
// const center = {
//   lat: 40.218899,
//   lng: 28.870001,
// };

export default function EditLocationComponent({ resByIdData, valueTitle, setValue }) {
  const { id } = useParams();
  const { currentCenter, isLocationPermissionGranted } = useLocationData();

  const [defaultIdFieldCenter, setDefaultIdFieldCenter] = useState(null);

  const [defaultCoords, setDefaultCoords] = useState([]);
  const [orderItem, setOrderItem] = useState(1);
  const [sendValues, setSendValues] = useState([]);

  const [isOver, setIsOver] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [rectangleCoords, setRectangleCoords] = useState([]);

  // console.log(currentCenter);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  useEffect(() => {
    // console.log(navigator.geolocation);
    // const { lat, lng } = currentCenter;

    const sortedCoordinates = _.sortBy(resByIdData?.coordinates, 'order');
    if (id) {
      const formatCoords = sortedCoordinates.map((item, index) => ({
        lat: item.latitude,
        lng: item.longitude,
      }));
      setDefaultCoords(formatCoords);

      const latitudes = _.map(sortedCoordinates, 'latitude');
      const longitudes = _.map(sortedCoordinates, 'longitude');

      // Ortalama alma
      const centerLatitude = _.mean(latitudes);
      const centerLongitude = _.mean(longitudes);

      setDefaultIdFieldCenter({
        lat: centerLatitude,
        lng: centerLongitude,
      });
    } else {
      setDefaultIdFieldCenter(currentCenter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCenter, resByIdData]);

  // eslint-disable-next-line no-shadow
  const onLoad = React.useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds(defaultIdFieldCenter);
      map.fitBounds(bounds);
    },
    [defaultIdFieldCenter]
  );

  const onUnmount = React.useCallback(() => {
    // setMap(null);
  }, []);

  const handleMapClick = (e) => {
    if (drawing) {
      // Tıklanan noktanın koordinatlarını al
      const clickedLocation = e.latLng;

      const formatItem = {
        order: orderItem,
        latitude: clickedLocation.lat(),
        longitude: clickedLocation.lng(),
      };
      setOrderItem(orderItem + 1);
      // Yeni bir Marker ekleyerek tıklanan noktayı işaretle
      setSendValues([...sendValues, formatItem]);
      setRectangleCoords([...rectangleCoords, clickedLocation]);
      // console.log(clickedLocation.lat());
    }
  };

  const startDrawing = () => {
    setIsOver(false);
    setDrawing(true);
    setRectangleCoords([]);
  };

  const stopDrawing = () => {
    setDrawing(false);
    setIsOver(true);
    setDefaultCoords(rectangleCoords);
    // console.log(`rectangleCoords : ${rectangleCoords}`);
    setValue(valueTitle, sendValues || []);
  };

  const resetDrawing = () => {
    setRectangleCoords([]);
  };

  // console.log(defaultIdFieldCenter);

  return (
    <>
      {isLocationPermissionGranted && currentCenter !== null && defaultIdFieldCenter !== null ? (
        isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultIdFieldCenter}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
          >
            {drawing && (
              <Polygon
                paths={rectangleCoords}
                options={{
                  fillColor: '#00FF00',
                  fillOpacity: 0.35,
                  strokeColor: '#0000FF',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
              />
            )}

            {!drawing && (
              <Polygon
                paths={defaultCoords}
                options={{
                  fillColor: '#00FF00',
                  fillOpacity: 0.35,
                  strokeColor: '#0000FF',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
              />
            )}

            {/* Anlık Konum  */}
            {!drawing && (
              <Marker
                icon={{
                  path: 'M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64',
                  fillColor: 'red', // Change the fill color here
                  fillOpacity: 1,
                  scale: 0.05,
                }}
                position={currentCenter}
              />
            )}

            {!isOver &&
              drawing &&
              rectangleCoords.map((location, index) => (
                <Marker key={index} position={{ lat: location.lat(), lng: location.lng() }} />
              ))}

            {!isOver &&
              !drawing &&
              defaultCoords?.map((location, index) => (
                <Marker key={index} position={{ lat: location.lat, lng: location.lng }} />
              ))}

            {!drawing &&
              isOver &&
              defaultCoords?.map((location, index) => (
                <Marker key={index} position={{ lat: location.lat(), lng: location.lng() }} />
              ))}
          </GoogleMap>
        ) : (
          <></>
        )
      ) : (
        <h1>Lütfen Konum İznini Onaylayınız</h1>
      )}

      {isLocationPermissionGranted && (
        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="contained" color="info" onClick={startDrawing}>
            Yeni Alan Çizmeye Başla
          </Button>

          {drawing && (
            <Button variant="contained" color="error" onClick={resetDrawing}>
              Sıfırla
            </Button>
          )}
          {drawing && rectangleCoords.length >= 3 && (
            <Button variant="contained" color="success" onClick={stopDrawing}>
              Kaydet ve Çizimi Bitir
            </Button>
          )}
        </Stack>
      )}
    </>
  );
}
