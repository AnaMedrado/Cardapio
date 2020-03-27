import React from "react";
import Button from "@material-ui/core/Button";
import { SnackbarProvider, useSnackbar } from "notistack";

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();
  
  const handleClickVariant = () => {

    const variant = "error";
    const message = "mensagem";
    // variant could be success, error, warning, info, or default
    // message recebida pela chamada da função
    enqueueSnackbar(message , { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickVariant}>
        Show warning snackbar
      </Button>
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {
  return (
    //maxSnack é o número maximo de barras que podem ter 
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}
