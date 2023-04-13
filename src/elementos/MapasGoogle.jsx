import React from 'react'
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '650PX',
  height: '400px'
};

const center = {
  lat: -12.039739, lng: -76.992596 
};

const position = {
   lat: -11.975091, lng: -77.104723 
   
}
const position2 = {
  lat: -12.039739, lng: -76.992596 
   
}

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBJ73jVdZg14wnj9oBrP_Qar6t5RtUmPTw"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  



  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
      
      position={position}
    />
        <Marker
      
      position={position2}
    />
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)