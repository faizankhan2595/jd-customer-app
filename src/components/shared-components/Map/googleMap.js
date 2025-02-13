import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Circle from "../../../assets/Oval.png"

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 1.3521, // Singapore Latitude
  lng: 103.8198, // Singapore Longitude
};

const markersData = [
  { id: 1, lat: 28.520737, lng: 77.0372},
  { id: 2, lat: 1.2834, lng: 103.8607 },
  { id: 3, lat: 1.3324, lng: 103.7436},
];

const GoogleMapWithMarkers = ({data}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP,
  });

  if (!isLoaded) return <p>Loading Maps...</p>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
     {markersData.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: Circle, 
            scaledSize: new window.google.maps.Size(20, 20), 
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapWithMarkers;
