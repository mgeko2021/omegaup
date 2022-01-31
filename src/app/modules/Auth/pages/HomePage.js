import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { ContentRoute } from "../../../../_metronic/layout";
import Homepage from "../../../pages/Homepage";

const HomePage = () => {
  return (
    <>
      <Switch>
        <ContentRoute path="/home" component={Homepage} />
        {/* <Redirect from="/auth" exact={true} to="/auth/login" /> */}
        <Redirect to="/home" />
      </Switch>
    </>
  );
};

export default HomePage;
