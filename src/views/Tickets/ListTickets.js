import React, { useState, useEffect, Suspense } from "react";
import {
  Badge,
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

import { Link } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton/LoaderButton";

function ListTickets(props) {
  // const [fadeIn, setFadeIn] = useState(true);
  // const [timeout, setTimeout] = useState(300);
  // const [order, setOrder] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [apiError502, setApiError502] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ticketStatuses = {
    // Hardcoded for now: TODO: pull from Jira
    "To Do": "warning",
    Done: "success",
    Doing: "info"
  };

  useEffect(() => {
    onLoad();
  }, []); //eslint-disable-line

  const onLoad = async () => {
    var jiraProjects = [];
    var apiResults = await getData();
    if (apiResults) {
      Object.keys(apiResults).forEach(function(key) {
        jiraProjects.push(key);
      });

      setProjects(jiraProjects);
      setTickets(apiResults);
    }
  };

  // Pull out into a generic reusable function
  const getData = async () => {
    try {
      let apiName = "Fiji-Dev";
      let path = "/tickets";
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

  const closeTicketRequest = async ticketNo => {
    let apiName = "Fiji-Dev";
    let path = `/tickets/${ticketNo}/update`;
    let myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`
      }
    };
    try {
      await API.del(apiName, path, myInit);
    } catch (e) {
      alert(e);
    }
  };

  const toggleApiError502 = (show = false) => {
    setApiError502(show);
  };
  const dismissApiError502 = () => {
    toggleApiError502(false);
    props.history.push("/dashboard");
  };

  const closeTicket = a => e => {
    setIsLoading(true);
    closeTicketRequest(a);
    onLoad();
    setIsLoading(false);
  };

  const TicketList = () => {
    return (
      <Col xs="12">
        {projects.map((p, i) => (
          <Card>
            <CardHeader>
              <strong>{p}</strong>
              <div className="card-header-actions">
                <Link to={"/tickets/new/"}>
                  <Button block color="ghost-success" size="sm">
                    New Ticket
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardBody>
              <Row>{renderTickets(p)}</Row>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </Col>
    );
  };

  const renderTickets = project => {
    var ticketList = tickets[project];
    let page = [];
    for (var ticket in ticketList) {
      page.push(
        <Col md="4">
          <Card>
            <CardHeader>
              <strong>
                {ticket} - {ticketList[ticket].ticketTitle}
              </strong>
              <div className="card-header-actions">
                <Badge
                  color={ticketStatuses[ticketList[ticket].ticketStatus]}
                  className="float-right"
                >
                  {ticketList[ticket].ticketStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <p>{ticketList[ticket].ticketDescription} </p>
            </CardBody>
            <CardFooter>
              <LoaderButton
                size="sm"
                color="success"
                className="float-right mx-1"
                onClick={closeTicket(ticket)}
                isLoading={isLoading}
              >
                Close Ticket
              </LoaderButton>
              <Link to={`/tickets/edit/${ticket}`}>
                <Button
                  type="submit"
                  size="sm"
                  color="primary"
                  className="float-right mx-1"
                >
                  Update Ticket
                </Button>
              </Link>
              <Button size="sm" color="light" className="float-right mx-1">
                Add Comment
              </Button>
            </CardFooter>
          </Card>
        </Col>
      );
    }

    return page;
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Suspense fallback={<h1>Doesn't work</h1>}>
          <TicketList />
        </Suspense>
      </Row>
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

export default ListTickets;
