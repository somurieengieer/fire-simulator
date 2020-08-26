import React from 'react';
import './App.css';
import {Route, Switch} from "react-router";
import {myUrl} from "./layout/Urls";
import {FirePage} from "./layout/organism/FirePage";
import MenuFrame from "./layout/molecules/menu/MenuFrame";
import {TaxPage} from "./layout/organism/TaxPage";
import {AnnuityPage} from "./layout/organism/AnnuityPage";

function App() {
  return (
    <MenuFrame>
      <Switch>
        <Route exact path={myUrl.top}>
          {/*<CompoundInterestPage />*/}
          <FirePage />
        </Route>
        <Route exact path={myUrl.fire}>
          <FirePage />
        </Route>
        <Route exact path={myUrl.tax}>
          <TaxPage />
        </Route>
        <Route exact path={myUrl.annuity}>
          <AnnuityPage />
        </Route>
      </Switch>
    </MenuFrame>
  );
}

export default App;
