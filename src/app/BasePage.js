import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { GuardasPage } from "./pages/Guardas";
import { NoticiasPage } from "./pages/Noticias";
import { ContactoPage } from "./pages/Contacto";
import { MyPage } from "./pages/MyPage";
import { MinutasPage } from "./pages/Minutas";
import { PqrsPage } from "./pages/Pqrs";
import { SupervisionPage } from "./pages/Supervision";
import { FormacionPage } from "./pages/FormacionPage";
import { ProgramacionPage } from "./pages/ProgramacionPage";
import { InicioPage } from "./pages/Inicio";
import { CorrespondenciaPage } from "./pages/CorrespondenciaPage";
import { VisitantesPage } from "./pages/VisitantesPage";

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/inicio" />
        }
        {/* <ContentRoute path="/dashboard" component={DashboardPage} /> */}
        <ContentRoute path="/inicio" component={InicioPage} />
        <ContentRoute path="/guardas" component={GuardasPage} />
        <ContentRoute path="/minutas" component={MinutasPage} />
        <ContentRoute path="/supervision" component={SupervisionPage} />
        <ContentRoute path="/noticias" component={NoticiasPage} />
        <ContentRoute path="/contacto" component={ContactoPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <ContentRoute path="/PQRS" component={PqrsPage} />
        <ContentRoute exact path="/formacion/:id" component={FormacionPage} />
        <ContentRoute
          exact
          path="/programacion/:id"
          component={ProgramacionPage}
        />
        <ContentRoute path="/correspondencia" component={CorrespondenciaPage} />
        <ContentRoute path="/visitantes" component={VisitantesPage} />
        {/* <ContentRoute path="/homepage" component={Homepage} /> */}
        {/* <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />  */}
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
