'use client'
import { useRef, useEffect } from "react";
import mapboxgl from 'mapbox-gl';
import { Grid, Typography } from "@mui/material";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useGeolocation } from "@/hooks/useGeolocation";


export default function Map() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { location } = useGeolocation()

  useEffect(() => {


    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [location.lng, location.lat],
      zoom: 15,
      language: 'pt-BR'
    });

    new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map.current);

  }, [location]);

  return (
    <Grid size={7} sx={{ flexGrow: 1 }} >
      <Typography component='h4' variant='overline' fontSize='large'>Localização</Typography>
      <div className="rounded border border-zinc-300" ref={mapContainer} style={{ width: '100%', minHeight: '400px', flexGrow: 1, display: 'flex' }} />
    </Grid>

  )
}
