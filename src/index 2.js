import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/stable";
// import 'react-app-polyfill/ie11'; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Amplify from "aws-amplify";
import config from "./config";
import { BrowserRouter } from "react-router-dom";

// ENABLE DEBUG MODE
//window.LOG_LEVEL = "DEBUG";
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    cognitoAuthUrl: config.cognito.AUTH_URL,
    cognitoRedirectUrl: config.cognito.REDIRECT_URL
  },
  // Storage: {
  //   region: config.s3.REGION,
  //   bucket: config.s3.BUCKET,
  //   identityPoolId: config.cognito.IDENTITY_POOL_ID
  // },
  API: {
    endpoints: [
      {
        name: "Fiji-Dev",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
        authenticationType: "AMAZON_COGNITO_USER_POOLS",
        custom_header: async () => {
          return {
            // Authorization: `Bearer ${(await Auth.currentSession())
            //   .getAccessToken()
            //   .getJwtToken()}`,
            "Access-Control-Allow-Origin": "*"
          };
        }
      }
    ]
  }
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
