import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS separately

import '../.././leaflet.css'


export default function Map() {
  const center = { lat: 19.075983, lng: 72.877655 };
  const zoomLevel = 9;

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={zoomLevel} scrollWheelZoom={false}>
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/backdrop/256/{z}/{x}/{y}.png?key=IKy5fFr8UVCOTQp8a4be"
        />
      </MapContainer>
    </div>
  );
}
