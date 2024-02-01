import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({
  component: C,
  appProps,
  ...rest
}) {
  // console.log("appProps.isAuthenticated");
  // console.log(appProps.isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated === true ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
}
