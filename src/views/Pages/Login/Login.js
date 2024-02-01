import React, { useState } from "react";

import { Auth, API } from "aws-amplify";

// import { Credentials } from "@aws-amplify/core";

// import {
//   CognitoUserSession,
//   CognitoIdToken,
//   CognitoRefreshToken,
//   CognitoAccessToken
// } from "amazon-cognito-identity-js";
import { Link, Redirect } from "react-router-dom";
import LoaderButton from "../../../components/LoaderButton/LoaderButton";
import { useFormFields } from "../../../hooks/useFormFields";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import config from "../../../config";
// import { _ } from "core-js";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [validCreds, setValidCreds] = useState(false);
  const [mfaValid, setMFAValid] = useState(false);
  const [userGuid, setUserGuid] = useState("");

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    mfaTOTPCode: "",
  });

  // login and check MFA status (challenge name)
  // if mfa needs to be registered, kick that off
  // otherwise wait for TOTP
  // send and validate TOTP to lambda
  // login
  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const user = await Auth.signIn(fields.email, fields.password);
      //await props.updateAuthStatus(true);
      setUserGuid(user.username);

      // console.log("Logged In!");
      // console.log(user);

      setIsLoading(false);
      setValidCreds(true);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleMFASubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    await authWithMFA(fields.mfaVerificationCode).then((data) => {
      try {
        // console.log("authWithMFAResult");
        // console.log(data);
        setMFAValid(data);
      } catch (e) {
        alert("Waiting for Reece to fix the Lambda :)");
        alert(JSON.stringify(e.message));
      }
    });

    setIsLoading(false);
  }

  // Use the entered credentials and the MFA TOTP to authenticate the user
  const authWithMFA = async () => {
    try {
      var result = false;
      // probably redundant, but fuck it, it works
      var mfaAuthSession = await Auth.signIn(fields.email, fields.password);
      await Auth;

      // console.log("mfaAuthSession");
      // console.log(mfaAuthSession);
      var body = {
        session: mfaAuthSession.Session,
        client_id: config.cognito.APP_CLIENT_ID,
        username: userGuid,
        code: fields.mfaTOTPCode,
      };

      let apiName = "Fiji-Dev";
      let path = "/mfavalidator";
      let myInit = {
        headers: {
          "Content-Type": "application/json",
        },
        body,
      };
      console.log("AQUI!!!");
      await API.post(apiName, path, myInit).then((data) => {
        // console.log("result");
        // console.log(data);
        // console.log(data.body.AuthenticationResult.AccessToken);

        // var session = new CognitoUserSession({
        //   IdToken: new CognitoIdToken({
        //     IdToken: data.body.AuthenticationResult.IdToken
        //   }),
        //   RefreshToken: new CognitoRefreshToken({
        //     RefreshToken: data.body.AuthenticationResult.RefreshToken
        //   }),
        //   AccessToken: new CognitoAccessToken({
        //     AccessToken: data.body.AuthenticationResult.AccessToken
        //   })
        // });

        // Credentials.set(session, "session");

        // "Login"
        // NOT CLEAN! Amplify is shit and doesn't leave us with many other choices...

        localStorage.setItem(
          `CognitoIdentityServiceProvider.${config.cognito.APP_CLIENT_ID}.${userGuid}.accessToken`,
          data.body.AuthenticationResult.AccessToken
        );
        localStorage.setItem(
          `CognitoIdentityServiceProvider.${config.cognito.APP_CLIENT_ID}.${userGuid}.clockDrift`,
          0
        );
        localStorage.setItem(
          `CognitoIdentityServiceProvider.${config.cognito.APP_CLIENT_ID}.${userGuid}.idToken`,
          data.body.AuthenticationResult.IdToken
        );
        localStorage.setItem(
          `CognitoIdentityServiceProvider.${config.cognito.APP_CLIENT_ID}.${userGuid}.refreshToken`,
          data.body.AuthenticationResult.RefreshToken
        );
        // localStorage.setItem(
        //   `CognitoIdentityServiceProvider.${config.cognito.APP_CLIENT_ID}.${userGuid}.userData`,
        //   result.body.RefreshToken
        // );
        localStorage.setItem(
          `CognitoIdentityServiceProvider.${config.cognito.APP_CLIENT_ID}.LastAuthUser`,
          userGuid
        );
        localStorage.setItem(`amplify-signin-with-hostedUI`, false);
        result = true;
      });
    } catch (e) {
      if (e.message === "Request failed with status code 502") {
      } else {
        alert(JSON.stringify(e));
      }
    }
    return result;
  };

  function redirectToHome() {
    // console.log("redirecting");
    window.location.reload();
    return <Redirect to={`/Dashboardtest`} />;
  }

  function renderLogin() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={handleLoginSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="email"
                          autoFocus
                          type="email"
                          placeholder="email"
                          value={fields.email}
                          onChange={handleFieldChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Password"
                          value={fields.password}
                          onChange={handleFieldChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <LoaderButton
                            block
                            color="primary"
                            type="submit"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                            className="px-4"
                          >
                            Login
                          </LoaderButton>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Register your user.</p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                      {/* <br />
                      <Link to="/registervendor">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register as a vendor.
                        </Button>
                      </Link> */}
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  function renderMFA() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={handleMFASubmit}>
                    <h1>MFA</h1>
                    <p>
                      Enter the value in the field below to verify the account.
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>#</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="mfaTOTPCode"
                        type="tel"
                        placeholder="MFA Code"
                        onChange={handleFieldChange}
                        autoFocus
                      />
                    </InputGroup>
                    <LoaderButton
                      color="success"
                      block
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      Enter Code
                    </LoaderButton>
                  </Form>
                </CardBody>
                <CardFooter className="p-4"></CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="">
      {validCreds ? (mfaValid ? redirectToHome() : renderMFA()) : renderLogin()}
    </div>
  );
}
