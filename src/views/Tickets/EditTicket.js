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

/*

TODO: Error handling - bad ticket number, no access to ticket etc..
Dynamically pull valid statuses for specific project from API
*/

function EditTicket(props) {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false); //eslint-disable-line
  const [ticketFields, setTicketFields] = useState({
    projectKey: "",
    projectName: "",
    priority: { id: "", name: "" },
    issuetype: { id: "", name: "" },
    statusId: "",
    statusName: "",
    summary: "",
    description: ""
  });
  const [wasSuccess, setWasSuccess] = useState(false);
  const [formTitle, setFormTitle] = useState(""); //eslint-disable-line
  const [jiraProject, setJiraProject] = useState("");
  const [formModel, setForm] = useState([]);

  // When a field changes, update state
  const handleChange = (e, changedFields) => {
    var obj = { ...ticketFields, ...changedFields };
    setTicketFields({ ...obj });
  };

  // #FakeItTilYouMakeIt
  var TicketPriorityValues = {
    Lowest: "Lowest",
    Low: "Low",
    Medium: "Medium",
    High: "High",
    Highest: "Highest"
  };

  var c1TicketTypeValues = { Task: "Task" };
  var fpTicketTypeValues = {
    Task: "Task",
    "New Feature": "New Feature",
    Improvement: "Improvement",
    Bug: "Bug",
    Epic: "Epic"
  };
  var JiraProjectValues = {
    C1: "TestCustomerOne",
    FP: "Fortian Portal",
    VEN: "Vendor Assessment"
  };
  var c1TicketTypes = {
    key: "ticketType",
    label: "Ticket Type",
    type: "select",
    options: c1TicketTypeValues,
    value: ticketFields.issuetype.name,
    onChange: handleChange
  };
  var fpTicketTypes = {
    key: "issueType",
    label: "Ticket Type",
    type: "select",
    options: fpTicketTypeValues,
    value: ticketFields.issuetype.name,
    onChange: handleChange
  };
  var jiraProjectField = {
    key: "project",
    label: "Project",
    type: "static",
    value: JiraProjectValues[jiraProject]
  };

  var basicFormFields = [
    {
      key: "priorityName",
      label: "Priority",
      type: "select",
      options: TicketPriorityValues,
      value: ticketFields.priority.name,
      onChange: handleChange
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
      props: { required: true },
      value: ticketFields.summary,
      onChange: handleChange
    },
    {
      key: "description",
      label: "Ticket Description",
      type: "textarea",
      props: { required: true },
      value: ticketFields.description,
      onChange: handleChange
    }
  ];

  // const updateFormModel = tf => {};

  // const newForm = [jiraProjectField, c1TicketTypes, ...basicFormFields];

  const GetTicket = async ticketNo => {
    console.log("Getting jira ticket: " + ticketNo);
    let result = "";
    let apiName = "Fiji-Dev";
    let path = "/tickets/" + ticketNo;
    let myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`
      }
    };
    try {
      result = await API.get(apiName, path, myInit);
      setTicketFields({ ...result.fields });
      setJiraProject(result.fields.project.key);
    } catch (e) {
      alert(e);
    }
    return result;
  };

  // Build the form depending on what project the ticket was part of.
  const populateForm = () => {
    var newForm = [];
    switch (jiraProject) {
      case "C1":
        newForm = [jiraProjectField, c1TicketTypes, ...basicFormFields];
        break;
      case "FP":
        fpTicketTypes.value = ticketFields.issuetype.name;

        newForm = [jiraProjectField, fpTicketTypes, ...basicFormFields];
        break;
      case "VEN":
        newForm = [jiraProjectField, c1TicketTypes, ...basicFormFields];
        break;
      default:
        newForm = [jiraProjectField, c1TicketTypes, ...basicFormFields];
        break;
    }
    setForm(newForm);
  };

  // TODO: error handling
  useEffect(() => {
    const fetchData = async () => {
      await GetTicket(id);
    };
    fetchData();
    populateForm();
    // console.log("newForm");
    // console.log(newForm);
  }, [jiraProject]); //eslint-disable-line
  // using formModel causes an infinite loop

  const loading = () => (
    <div className="animated fadeIn pt-3 text-center">Loading...</div>
  );

  const postData = async body => {
    console.log("posting");
    let result = "";
    let apiName = "Fiji-Dev";
    let path = `/tickets/${id}/update`;
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
    console.log("submitted");
    setIsLoading(true);

    var res = await postData(ticketFields);
    console.log(res);
    if (res["result"] === "None") {
      toggleWasSuccess(true);
    }

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
      <React.Suspense fallback={loading()}>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                Update ticket: <strong>{id}</strong>
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
      </React.Suspense>
    </div>
  );
}

export default EditTicket;
