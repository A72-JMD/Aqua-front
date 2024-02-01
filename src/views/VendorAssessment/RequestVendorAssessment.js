import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { Auth, API } from "aws-amplify";

import DynamicForm from "../../components/DynamicForm/DynamicForm";

function RequestVendorAssessment(props) {
  const [wasSuccess, setWasSuccess] = useState(false);
  const [createdTicket, setCreatedTicket] = useState("");
  const [formTitle, setFormTitle] = useState("LGT file pending to upload"); //eslint-disable-line
  const [formModel, setForm] = useState([]);
  const [apiError502, setApiError502] = useState(false);

  useEffect(() => {
    onLoad();
  }, []); //eslint-disable-line

  const onLoad = async () => {
    var currentUser = await Auth.currentAuthenticatedUser();

    var groups = await currentUser.signInUserSession.accessToken.payload[
      "cognito:groups"
    ];

    // Only vendors are allowed here
    if (groups.includes("Customer")) {
    } else {
      props.history.push("/401");
    }

    var apiResults = await getData();
    setForm(apiResults);
  };

  // Pull out into a generic reusable function
  const getData = async () => {
    try {
      let apiName = "Fiji-Dev";
      let path = "/tickets/vendorassessment/formfields";
      let myInit = {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`
        }
      };
      var result = await API.get(apiName, path, myInit);
    } catch (e) {
      if (e.message === "Request failed with status code 502") {
        toggleApiError502(true);
      } else {
        alert(JSON.stringify(e));
        props.onLogout();
      }
    }
    return result;
  };

  const postData = async body => {
    // console.log("posting");
    // console.log(body);
    let result = "";
    let apiName = "Fiji-Dev";
    let path = "/tickets/vendorassessment/create";
    let myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: { body }
    };
    try {
      result = await API.post(apiName, path, myInit);
    } catch (e) {
      alert(e);
    }
    return result;
  };

  const handleSubmit = async model => {
    // console.log("submittedHere");
    // console.log(model);

    var res = await postData(model);
    setCreatedTicket(res["issueKey"]);
    toggleWasSuccess(true);
  };

  const toggleWasSuccess = (show = false) => {
    setWasSuccess(show);
  };
  const dismissWasSuccess = () => {
    setWasSuccess(false);
  };

  const toggleApiError502 = (show = false) => {
    setApiError502(show);
  };
  const dismissApiError502 = () => {
    toggleApiError502(false);
    props.history.push("/dashboard");
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <DynamicForm
          className="form"
          title={formTitle}
          model={formModel}
          onSubmit={model => {
            handleSubmit(model);
          }}
        />
      </Row>
      <Modal
        isOpen={wasSuccess}
        toggle={toggleWasSuccess}
        className="modal-success"
      >
        <ModalHeader toggle={toggleWasSuccess}>Ticket submitted</ModalHeader>
        <ModalBody>
          Ticket was successfully submitted. Your reference number is:{" "}
          {createdTicket}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={dismissWasSuccess}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={apiError502}
        toggle={toggleApiError502}
        className="modal-danger"
      >
        <ModalHeader toggle={toggleApiError502}>API Error</ModalHeader>
        <ModalBody>
          We are having issues connecting to the API, please try again later.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={dismissApiError502}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default RequestVendorAssessment;
