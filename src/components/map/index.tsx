'use client'
import { useRef, useEffect } from "react";
import mapboxgl from 'mapbox-gl';
import { Grid, Typography } from "@mui/material";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map({ lat, lng }: Readonly<{ lat: number; lng: number }>) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 15,

    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    // return() => map.current.re];
  }, [lat, lng]);



  return (
    <Grid size={7} className="size-full">
      <Typography component='h4' variant='overline' fontSize='large'>Localização</Typography>
      <div className="rounded border border-zinc-300" ref={mapContainer} style={{ width: '100%', minHeight: '400px' }} />
    </Grid>

  )
}
