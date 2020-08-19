import React from 'react';
import './App.css';
import {CompoundInterestPage} from "./layout/organism/CompoundInterestPage";
import {Route, Switch} from "react-router";
import {myUrl} from "./layout/Urls";
import {FirePage} from "./layout/organism/FirePage";
import MenuFrame from "./layout/molecules/menu/MenuFrame";
import {TaxPage} from "./layout/organism/TaxPage";

function App() {
  return (
    <MenuFrame>
      <Switch>
        <Route exact path={myUrl.top}>
          <CompoundInterestPage />
        </Route>
        <Route exact path={myUrl.fire}>
          <FirePage />
        </Route>
        <Route exact path={myUrl.tax}>
          <TaxPage />
        </Route>
      </Switch>
    </MenuFrame>
  );
}

export default App;
