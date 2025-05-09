import { Grid, Typography } from "@mui/material";

export default function Map() {
  return (
    <Grid size={7} className="size-full">
      <Typography component='h4' variant='overline' fontSize='large'>Localização</Typography>
      <iframe
        aria-label='google map'
        allowFullScreen
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?Rua+Adilio+Ramos,+1391+-+Bairro+Alto,+Curitiba+PR,+82840-140&z=15&output=embed&language=pt"
        className="size-full mt-3"
      />
    </Grid>

  )
}
// src="//maps.google.com/maps?q=53.3381768,-6.2613077&z=15&output=embed"
//"https://www.google.com/maps/embed/v1/place?q=53.3381768,-6.2613077&zoom=15&language=pt"