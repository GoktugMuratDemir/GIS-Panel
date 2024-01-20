/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Polygon, Marker } from '@react-google-maps/api';
import { useLocationData } from 'src/auth/context/auth-location';

const containerStyle = {
  width: '100%',
  height: '600px',
};

export default function AddLocation() {
  const { currentCenter, isLocationPermissionGranted } = useLocationData();

  const [drawing, setDrawing] = useState(false);

  const [rectangleCoords, setRectangleCoords] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAa1OF3iN5VIEnitPUVCL1hTceGjaFv0A4',
  });

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

  const resetDrawing = () => {
    setRectangleCoords([]);
  };

  const startDrawing = () => {
    setDrawing(true);
    setRectangleCoords([]);
  };

  const stopDrawing = () => {
    setDrawing(false);
    setRectangleCoords([]); // Markerları kaldırmak için bu satırı ekleyin
    logSelectedLocations();
  };

  const logSelectedLocations = () => {
    console.log('Oluşturulan Konum : ', rectangleCoords);
    // console.log(rectangleCoords);
    // console.log('Seçili Konumlar:');
    // rectangleCoords.forEach((location, index) => {
    //   console.log(`Konum ${index + 1}: Lat: ${location.lat()}, Lng: ${location.lng()}`);
    // });
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

            {!drawing && <Marker position={currentCenter} />}

            {rectangleCoords.map((location, index) => (
              <Marker key={index} position={{ lat: location.lat(), lng: location.lng() }} />
            ))}
          </GoogleMap>
        ) : (
          <></>
        )
      ) : (
        <h1>Lütfen Konum İznini Onaylayınız</h1>
      )}

      {isLocationPermissionGranted && currentCenter !== null && (
        <div>
          <button type="button" onClick={startDrawing}>
            Dikdörtgen Çizmeye Başla
          </button>
          <button type="button" onClick={resetDrawing}>
            Sıfırla
          </button>
          <button type="button" onClick={stopDrawing}>
            Dikdörtgen Çizmeyi Durdur ve Yeni Konum Oluştur
          </button>
        </div>
      )}
    </>
  );
}
