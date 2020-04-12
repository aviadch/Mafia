import React from "react";

import MyProvider from "./infra/MyProvider.js";

import MafiaApp from "./MafiaApp";

const App = () => {
  return (
    <MyProvider>
      <MafiaApp />
    </MyProvider>
  );
};

export default App;
