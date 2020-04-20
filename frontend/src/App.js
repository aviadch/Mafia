import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import MyProvider from './infra/MyProvider';

import MafiaRoutes from './MafiaRoutes';

const App = () => (
  <BrowserRouter>
    <MyProvider>
      <MafiaRoutes />
    </MyProvider>
  </BrowserRouter>
);

export default App;
