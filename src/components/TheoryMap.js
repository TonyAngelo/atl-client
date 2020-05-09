import React from "react";
import GoogleMapReact from 'google-map-react';

export default function TheoryMap({
  className = "",
  disabled = false,
  text = "Atlantis",
  zoom = 3,
  lat = 37.7412,
  lng = -25.6756,
  ...props
}) {
  if(disabled) {
    return null;
  }

  function getMapOptions(maps) {
    return {
      mapTypeId: maps.MapTypeId.SATELLITE,
    };
  }

  return (
    <div style={{ height: '75vh', width: '100%' }} className="mb-4">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCKXbf_8tEGf5fVR1rfiDCfDqONEL9N13o" }}
        defaultCenter={{lat: lat,lng: lng}}
        defaultZoom={zoom}
        options={getMapOptions}
      >
        
      </GoogleMapReact>
    </div>
  );
}