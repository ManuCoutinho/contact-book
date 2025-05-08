import { Grid, Typography } from "@mui/material";

export default function ContactList() {
  return (
    <Grid size={4} className="min-h-max">
      <Typography component='h4' variant='overline' fontSize='large'>Contatos</Typography>
      <Typography color="textDisabled" variant="caption" align='center'>Faça o login ou registre-se para utilizar</Typography>
    </Grid>
  )
}