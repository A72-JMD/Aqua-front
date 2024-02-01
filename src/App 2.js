import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";
import { GetUserDetails } from "./Common/Auth/UserDetails";

function App(props) {
  // let { id } = useParams();
  // const [userGroups, setUserGroups] = useState([]);
  const [userDetails, setUserDetails] = useState(GetUserDetails());
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  //const [testState, setTestSTate] = useState("teststring");

  const signOut = async () => {
    console.log("Signing out.");
    await Auth.signOut() // { global: true }
      .then(data => console.log(data))
      .catch(err => console.log(err));
    updateAuthStatus(false);
    console.log("signed out.");
  };

  useEffect(() => {
    onLoad();
  }, []); //eslint-disable-line

  // useEffect(() => {
  //   console.log("userdetails");
  //   console.log(userDetails);
  // }, [userDetails]);

  // useEffect(() => {
  //   console.log("App Authed: " + isAuthenticated);
  // }, [isAuthenticated]);

  async function onLoad() {
    try {
      var currentSession = await Auth.currentSession();
      var user = await Auth.currentAuthenticatedUser();
      // console.log("user");
      // console.log(user);
      // console.log("Current Session");
      // console.log(currentSession);
      setUserDetails(await GetUserDetails());
      updateAuthStatus(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
  }

  const updateAuthStatus = async status => {
    userHasAuthenticated(status);
    setUserDetails(await GetUserDetails());
  };
  const loading = () => (
    <div className="animated fadeIn pt-3 text-center">Loading...</div>
  );

  // Containers
  const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

  // Pages
  const Login = React.lazy(() => import("./views/Pages/Login"));
  const Register = React.lazy(() => import("./views/Pages/Register"));
  const RegisterVendor = React.lazy(() =>
    import("./views/Pages/RegisterVendor")
  );
  const Page404 = React.lazy(() => import("./views/Pages/Page404"));
  const Page500 = React.lazy(() => import("./views/Pages/Page500"));

  // async function handleLogout() {
  //   await Auth.signout();

  //   userHasAuthenticated(false);
  //   console.log("Handling Logout");
  //   this.props.history.push("/login");
  // }

  // console.log("isAuthenticated");
  // console.log(isAuthenticated);
  // All App props go in here so that they can be correctly passed through the authenticated or unauthenticated components
  const appProps = {
    isAuthenticated: isAuthenticated,
    updateAuthStatus: updateAuthStatus,
    onLogout: signOut,
    userDetails: userDetails
  };

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <UnauthenticatedRoute
            exact
            path="/login"
            name="Login Page"
            component={Login}
            appProps={appProps}
            props={props}
          />
          <UnauthenticatedRoute
            exact
            path="/register"
            name="Register Page"
            component={Register}
            appProps={appProps}
            props={props}
          />
          <UnauthenticatedRoute
            exact
            path="/registervendor"
            name="Register Vendor Page"
            component={RegisterVendor}
            appProps={appProps}
            props={props}
          />
          <UnauthenticatedRoute
            exact
            path="/404"
            name="Page 404"
            component={Page404}
            appProps={appProps}
            props={props}
          />
          <UnauthenticatedRoute
            exact
            path="/500"
            name="Page 500"
            component={Page500}
            appProps={appProps}
            props={props}
          />
          <AuthenticatedRoute
            path="/"
            name="Home"
            component={DefaultLayout}
            appProps={appProps}
            {...props}
          />
          <UnauthenticatedRoute
            component={Page404}
            appProps={appProps}
            props={props}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default withRouter(App);
