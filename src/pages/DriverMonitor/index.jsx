import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Title from 'antd/lib/typography/Title';
import TrackLocation from './components/TrackLocation';
import useGoogleMap from '@/hooks/useGoogleMap';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: "4px"
};

const center = {
  lat: 10.762913,
  lng: 106.6821717
};

const libraries = ["places"];

function DriverMonitoring() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCTGfs20rFzNH-ncSZJ852aIQujbcyuteU",
    libraries,
    region: "US",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((mapp) => {
    const bounds = new window.google.maps.LatLngBounds();
    console.log(bounds);
    // mapp.fitBounds(bounds);
    // setMap(mapp);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <></>;
}


// const DriverMonitoring = () => {
//   const mapRef = useRef(null);
//   const intl = useIntl();
//   const [markers, setMarkers] = useState([{ time: new Date(), lat: 10.762913, lng: 106.6821717 }, { time: new Date(), lat: 10.8069877, lng: 106.6304571 }]);
//   const [position, setPosition] = useState({
//     lat: 10.762913,
//     lng: 106.6821717
//   });

//   const onLoad = React.useCallback((map) => {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);

//     mapRef.current = map;
//   }, []);

//   const onUnmount = React.useCallback((map) => {
//     mapRef.current = null;
//   }, []);


//   const panTo = useCallback(
//     (location) => {
//       mapRef.current.panTo(location);
//     },
//     [],
//   );


//   const handleMapOnClick = (e) => {
//     panTo({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//   };

//   const handleLoad = (map) => {
//     mapRef.current = map;
//   };

//   const handleCenter = () => {

//     const newPos = mapRef.current.getCenter().toJSON();
//     setPosition(newPos);
//   };

//   return (
//     <PageContainer>
//       <Card>
//         <Title level={5}>Overview</Title>
//         {true && <GoogleMap
//           // onClick={handleMapOnClick}
//           // onUnmount={onUnmount}
//           zoom={10}
//           onLoad={handleLoad}
//           onDragEnd={handleCenter}
//           center={position}
//           id="map"
//           mapContainerStyle={containerStyle}
//         >
//           { /* Child components, such as markers, info windows, etc. */}
//           {/* <>
//           {markers.map(marker => <Marker key={marker.time} position={{ lat: marker.lat, lng: marker.lng }} />)}
//           </> */}
//         </GoogleMap>}
//         <Title className="mt-5" level={5}>Drivers Overview</Title>

//       </Card>


//     </PageContainer>
//   );
// };

export default React.memo(DriverMonitoring);
