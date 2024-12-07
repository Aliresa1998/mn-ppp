import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./components/layout/Main";
import Home from "./pages/Home";
import Report from "./pages/Report";
import "antd/dist/reset.css";

const App = () => {
  return (
    <div>
      <Switch>
        <Main>
          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/report" component={Report} />

            <Route path="*" component={Home} />
          </Switch>
        </Main>
      </Switch>
    </div>
  );
};

export default App;
