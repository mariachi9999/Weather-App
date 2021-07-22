import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './react-leaflet.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWFjaGk5OTk5IiwiYSI6ImNrcXByb3AxcTEzeWIybm16cmk0Y210eGsifQ.xT53OcBmA9gfbsOoTaqzmA'

export default function App({latitude, longitude}) {
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });
  });

  useEffect(() => {
    setLng(longitude)
    setLat(latitude)
  }, [longitude])

  useEffect(() => {
    map.current.jumpTo({center: [lng,lat]})}
    ,[lng]);

  return (
    <div className= "mapa">
      <div className="sidebar">
      Longitude: {lng} | Latitude: {lat}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
    );

}

