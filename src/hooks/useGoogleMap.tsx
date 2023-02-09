import { useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
const libraries = ["places"] as any;

const MapScript = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCTGfs20rFzNH-ncSZJ852aIQujbcyuteU",
    libraries,
    region: "US"
  });

  return <> </>;
};

const useGoogleMap = () => {
  const isBrowser = typeof document !== 'undefined'; // require('@react-google-maps/api/src/utils/isbrowser')
  const isAlreadyLoaded =
    window.google &&
    window.google.maps;
  if (isBrowser && isAlreadyLoaded) return null;
  return <MapScript />;
};

export default useGoogleMap;
