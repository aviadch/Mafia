import React from "react";
import { BrowserRouter } from "react-router-dom";

import MyProvider from "./infra/MyProvider.js";

import MafiaApp from "./MafiaApp";

const App = () => {
  return (
    <BrowserRouter>
      <MyProvider>
        <MafiaApp />
      </MyProvider>
    </BrowserRouter>
  );
};

export default App;
