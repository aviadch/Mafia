import React from "react";
import { BrowserRouter } from "react-router-dom";

import MyProvider from "./infra/MyProvider.js";

import MafiaRoutes from "./MafiaRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <MyProvider>
        <MafiaRoutes />
      </MyProvider>
    </BrowserRouter>
  );
};

export default App;
