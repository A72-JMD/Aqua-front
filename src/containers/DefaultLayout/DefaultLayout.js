import React, { useEffect, Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";
import AuthenticatedRoute from "../../components/AuthenticatedRoute/AuthenticatedRoute";

import LoadingBlock from "../../components/loadingBlock/loadingBlock";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

function DefaultLayout(props) {
  //const [isAuthd, setIsAuthd] = useState(false); // Not sure if I need this anymore... think auth state is being handled by App.js
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    //setIsAuthd(props.isAuthenticated);
  }

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={<LoadingBlock />}>
          <DefaultHeader
            onLogout={props.onLogout}
            isAuthenticated={props.isAuthenticated}
            updateText={props.updateTest}
          />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigation} {...props} router={router} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <AppBreadcrumb appRoutes={routes} router={router} />
          <Container fluid>
            <Suspense fallback={<LoadingBlock />}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <AuthenticatedRoute
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      appProps={props}
                      component={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside fixed>
          <Suspense fallback={<LoadingBlock />}>
            <DefaultAside />
          </Suspense>
        </AppAside>
      </div>
      <AppFooter>
        <Suspense fallback={<LoadingBlock />}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
}

export default DefaultLayout;
