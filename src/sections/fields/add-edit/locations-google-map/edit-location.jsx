/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Polygon, Marker } from '@react-google-maps/api';
import { useParams } from 'react-router';
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

export default function EditLocation() {
  const { id } = useParams();
  const { currentCenter, isLocationPermissionGranted } = useLocationData();
  const [defaultCoords, setDefaultCoords] = useState([]);

  const [isOver, setIsOver] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [rectangleCoords, setRectangleCoords] = useState([]);
  // const id = 2;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAa1OF3iN5VIEnitPUVCL1hTceGjaFv0A4',
  });

  useEffect(() => {
    // console.log(navigator.geolocation);
    const { lat, lng } = currentCenter;
    if (id) {
      setDefaultCoords([
        { lat, lng },
        { lat: lat + 0.0001, lng },
        { lat: lat + 0.0001, lng: lng + 0.0001 },
        { lat, lng: lng + 0.0001 },
      ]);
    }
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

  const handleMapClick = (e) => {
    if (drawing) {
      // Tıklanan noktanın koordinatlarını al
      const clickedLocation = e.latLng;
      // Yeni bir Marker ekleyerek tıklanan noktayı işaretle
      setRectangleCoords([...rectangleCoords, clickedLocation]);
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
    console.log(`rectangleCoords : ${rectangleCoords}`);
  };

  const resetDrawing = () => {
    setRectangleCoords([]);
  };

  return (
    <>
      {isLocationPermissionGranted && currentCenter !== null ? (
        isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentCenter}
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

            {!drawing && !id && (
              <Marker
                icon={{
                  path: 'M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.833 256-256S397.167 0 256 0zm0 469.333C137.067 469.333 42.667 374.933 42.667 256S137.067 42.667 256 42.667 469.333 137.067 469.333 256 374.933 469.333 256 469.333z',
                  fillColor: 'black', // Change the fill color here
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
        <div>
          <button type="button" onClick={startDrawing}>
            Yeni Alan Çizmeye Başla
          </button>
          {drawing && (
            <button type="button" onClick={resetDrawing}>
              Sıfırla
            </button>
          )}
          {drawing && rectangleCoords.length >= 3 && (
            <button type="button" onClick={stopDrawing}>
              Kaydet ve Çizimi Bitir
            </button>
          )}
        </div>
      )}
    </>
  );
}
