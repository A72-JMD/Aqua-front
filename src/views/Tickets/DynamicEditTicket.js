import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { Auth, API } from "aws-amplify";
import { useParams } from "react-router-dom";

import DynamicForm from "../../components/DynamicForm/DynamicForm";

function DynamicEditTicket(props) {
  const [isLoading, setIsLoading] = useState(false); //eslint-disable-line

  const [wasSuccess, setWasSuccess] = useState(false);
  const [createdTicket, setCreatedTicket] = useState(""); //eslint-disable-line

  const [formTitle, setFormTitle] = useState("TestCustomerOne");
  const [formModel, setForm] = useState([]);

  // #FakeItTilYouMakeIt
  const updateFormTitle = ttl => {
    setFormTitle(JiraProjectValues[ttl]);
  };

  const updateForm = event => {
    updateFormTitle(event.target.value);
    var newForm = [];

    switch (event.target.value) {
      case "C1":
        newForm = [jiraProjects, c1TicketTypes, ...basicFormFields];
        break;
      case "FP":
        newForm = [jiraProjects, fpTicketTypes, ...basicFormFields];
        break;
      case "VEN":
        newForm = [jiraProjects, c1TicketTypes, ...basicFormFields];
        break;
      default:
        newForm = [jiraProjects, c1TicketTypes, ...basicFormFields];
        break;
    }
    setForm(newForm);
  };

  const TicketPriorityValues = {
    Lowest: "Lowest",
    Low: "Low",
    Medium: "Medium",
    High: "High",
    Highest: "Highest"
  };
  const c1TicketTypeValues = { Task: "Task" };
  const fpTicketTypeValues = {
    Task: "Task",
    "New Feature": "New Feature",
    Improvement: "Improvement",
    Bug: "Bug",
    Epic: "Epic"
  };
  const JiraProjectValues = {
    C1: "TestCustomerOne",
    FP: "Fortian Portal",
    VEN: "Vendor Assessment"
  };
  const c1TicketTypes = {
    key: "ticketType",
    label: "Ticket Type",
    type: "select",
    options: c1TicketTypeValues
  };
  const fpTicketTypes = {
    key: "ticketType",
    label: "Ticket Type",
    type: "select",
    options: fpTicketTypeValues
  };
  const jiraProjects = {
    key: "project",
    label: "Project",
    type: "select",
    options: JiraProjectValues,
    onChange: updateForm
  };

  const basicFormFields = [
    {
      key: "priority",
      label: "Priority",
      type: "select",
      options: TicketPriorityValues,
      value: "Medium"
    },
    {
      key: "reporter",
      label: "Reporter",
      type: "static",
      value: props.userDetails.userInfo.email
    },
    {
      key: "summary",
      label: "Ticket Summary",
      props: { required: true }
    },
    {
      key: "description",
      label: "Ticket Description",
      type: "textarea",
      props: { required: true }
    }
  ];

  const newForm = [jiraProjects, c1TicketTypes, ...basicFormFields];

  useEffect(() => {
    onLoad();
  }, []); //eslint-disable-line

  const onLoad = async () => {
    setForm(newForm);
  };
  const { id } = useParams();

  const postData = async body => {
    // console.log("posting");
    // console.log(body);
    let result = "";
    let apiName = "Fiji-Dev";
    let path = "/tickets/create";
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
    setIsLoading(true);

    var res = await postData(model);
    // console.log(res);
    setCreatedTicket(res["issueKey"]);
    // console.log(createdTicket);
    toggleWasSuccess(true);
    setIsLoading(false);
  };

  const toggleWasSuccess = (show = false) => {
    setWasSuccess(show);
  };
  const dismissWasSuccess = () => {
    setWasSuccess(false);
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <strong>Dynamic Edit Ticket</strong> {id}
            </CardHeader>
            <CardBody>
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
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>
      </Row>
      <Modal
        isOpen={wasSuccess}
        toggle={toggleWasSuccess}
        className="modal-success"
      >
        <ModalHeader toggle={toggleWasSuccess}>Ticket updated</ModalHeader>
        <ModalBody>Ticket {` ${id} `} was successfully updated.</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={dismissWasSuccess}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DynamicEditTicket;
