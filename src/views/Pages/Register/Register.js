import React, { useState } from "react";
import {
  Alert,
  Card,
  CardBody,
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

import LoaderButton from "../../../components/LoaderButton/LoaderButton";
import { useFormFields } from "../../../hooks/useFormFields";

import { Auth, API } from "aws-amplify";

import QRCode from "qrcode.react";

import "./Register.scss";
// import { FileSystemCredentials } from "aws-sdk/global";

export default function Register(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
    mfaVerificationCode: "",
  });
  const [newUser, setNewUser] = useState(null);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qrLink, setQRLink] = useState("");
  const [mfaQrCode, setMFAQRCode] = useState("");
  const [mfaSession, setMFASession] = useState("");
  const [userGuid, setUserGuid] = useState(""); //eslint-disable-line
  const [mfaFailedAlertVisible, setMFAFailedAlertVisible] = useState(false); //eslint-disable-line

  // TODO: Use this
  // function validateForm() {
  //   return (
  //     fields.email.length > 0 &&
  //     fields.password.length > 0 &&
  //     fields.password === fields.confirmPassword
  //   );
  // }

  // function validateConfirmationForm() {
  //   return fields.confirmationCode.length > 0;
  // }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      console.log("==========check email==============");
      console.log(fields.email);
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
        attributes: {
          "custom:Group": "Customer", // custom attribute, not standard
        },
      });
      console.log("==========check newuser==============");
      console.log(newUser);
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  /// #1 send the user session to validate MFA,
  /// returns: MFA secret, MFA Session
  const validateMFA = async () => {
    var x = await Auth.signIn(fields.email, fields.password);
    setUserGuid(x.username);
    var body = {
      session: x.Session,
    };

    try {
      let apiName = "Fiji-Dev";
      let path = "/secretgenerator";
      let myInit = {
        headers: {
          "Content-Type": "application/json",
        },
        body,
      };
      var result = await API.post(apiName, path, myInit);
      console.log(result);
    } catch (e) {
      if (e.message === "Request failed with status code 502") {
      } else {
        alert(JSON.stringify(e));
      }
    }
    return result;
  };

  /// #2 Finalise MFA using the TOTP and Session from #1
  /// Returns: MFA Session (unused)
  const finaliseMFA = async (totp) => {
    var body = {
      session: mfaSession,
      code: totp,
      device: "",
    };

    try {
      let apiName = "Fiji-Dev";
      let path = "/finalise-mfa";
      let myInit = {
        headers: {
          "Content-Type": "application/json",
        },
        body,
      };
      var result = await API.post(apiName, path, myInit);
    } catch (e) {
      // TODO: Gracefully handle failed MFA
      if (e.message === "Request failed with status code 502") {
      } else {
        alert(JSON.stringify(e));
      }
    }
    return result;
  };

  // Authenticate with the user creds and MFA.
  // NOTE: Doesn't work as expected, MFA token gets expired on first use (verify)
  // this means we cannot reuse it to automatically auth the user.
  // const authWithMFA = async mses => {
  //   try {
  //     var mfaAuthSession = await Auth.signIn(fields.email, fields.password);

  //     var body = {
  //       session: mfaAuthSession.Session,
  //       client_id: config.cognito.APP_CLIENT_ID,
  //       username: userGuid,
  //       code: fields.mfaVerificationCode
  //     };

  //     let apiName = "Fiji-Dev";
  //     let path = "/mfavalidator";
  //     let myInit = {
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body
  //     };
  //     var result = await API.post(apiName, path, myInit);
  //   } catch (e) {
  //     if (e.message === "Request failed with status code 502") {
  //     } else {
  //       alert(JSON.stringify(e));
  //     }
  //   }
  //   return result;
  // };

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    await Auth.confirmSignUp(
      fields.email,
      fields.confirmationCode
    ).then((data) => console.log(data));

    try {
      // Get secret from API
      await validateMFA()
        .then((data) => {
          setMFAQRCode(data.SecretCode);

          setMFASession(data.Session);

          setQRLink(
            "otpauth://totp/Fiji:" +
              fields.email +
              "?secret=" +
              data.SecretCode +
              "&issuer=Fiji-issuer"
          );
        })
        .catch((err) => console.log(err));
      setUserConfirmed(true);
      setIsLoading(false);
      //});
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  async function handleMFASubmit(event) {
    try {
      event.preventDefault();
      setIsLoading(true);
      await finaliseMFA(fields.mfaVerificationCode);
      // .then(data => {
      //  var newMFASession = "";
      //   newMFASession = data.body.Session;
      // });
    } catch (e) {
      alert("Waiting for Reece to fix the Lambda :)");
      alert(JSON.stringify(e.message));
    }
    // var x = newMFASession;
    // var authw = authWithMFA(newMFASession);

    // console.log("authw");
    // console.log(authw);

    // TODO: make this a bit more graceful. provide user feedback (success alert)
    props.history.push("/login");

    setIsLoading(false);
  }

  // function showMFAAlert() {
  //   setMFAFailedAlertVisible(true);

  //   setTimeout(() => {
  //     setMFAFailedAlertVisible(false);
  //   }, 5000);
  // }

  function renderQRCode() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={handleMFASubmit}>
                    <h1>Enable MFA</h1>
                    <p className="text-muted">
                      Enter the code from your email to confirm.
                    </p>

                    <QRCode value={qrLink} />
                    <p>
                      Scan the code above in your Authenticator app of choice.
                    </p>
                    <p>
                      If you are unable to scan the image, enter the following
                      information:
                      <br />
                      code: {mfaQrCode}
                    </p>
                    <p>
                      Enter the value in the field below to verify the account.
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>#</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="mfaVerificationCode"
                        type="tel"
                        placeholder="Verify MFA Code"
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
                      Verify Code
                    </LoaderButton>
                    <p>
                      <Alert
                        color="danger"
                        className={
                          mfaFailedAlertVisible ? "alert-shown" : "alert-hidden"
                        }
                      >
                        Failed to verify MFA code.
                      </Alert>
                    </p>
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

  function renderConfirmationForm() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={handleConfirmationSubmit}>
                    <h1>Confirmation code</h1>
                    <p className="text-muted">
                      Enter the code from your email to confirm.
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>#</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="confirmationCode"
                        type="tel"
                        placeholder="Confirmation Code"
                        onChange={handleFieldChange}
                        autoFocus
                        value={fields.confirmationCode}
                      />
                    </InputGroup>
                    <LoaderButton
                      color="success"
                      block
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      {" "}
                      Create Account
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

  function renderForm() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="email"
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={handleFieldChange}
                        value={fields.email}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
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
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        onChange={handleFieldChange}
                      />
                    </InputGroup>
                    <LoaderButton
                      color="success"
                      block
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      {" "}
                      Create Account
                    </LoaderButton>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  {/* <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block>
                        <span>facebook</span>
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block>
                        <span>twitter</span>
                      </Button>
                    </Col>
                  </Row> */}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="Register">
      {newUser === null
        ? renderForm()
        : userConfirmed === false
        ? renderConfirmationForm()
        : renderQRCode()}
    </div>
  );
}
