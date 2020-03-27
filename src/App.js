import React  from 'react';
import Routes from './routes';
import { SnackbarProvider } from 'notistack';

const App = () => (

      <div className="App">
        <SnackbarProvider maxSnack={3} >
          <Routes />
        </SnackbarProvider>
      </div>
);

export default App; 


