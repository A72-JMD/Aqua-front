import React, { useState, useEffect, Component } from "react";
import { Auth, API } from "aws-amplify";
import Helpers from "../../Common/helpers.js";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table
} from 'reactstrap';


function LoadPositionsFiles(props) {
  const [apiError502, setApiError502] = useState(false);
  const [positions, setPositions] = useState([]);
  const [Authheader, setHeader] = useState();

  const getheader = async () => {
    var result = `Bearer ${(await Auth.currentSession()) //Call aws-aplyfy Auth method
      .getIdToken()
      .getJwtToken()}`;
    setHeader(result); // set the auth header here;
    return result;
  };
  async function handleSubmit(file) {
    Helpers.httpRequest(
      `https://ww8jinvodc.execute-api.ap-southeast-2.amazonaws.com/V1/fiji-web-files/Banks%2FLGT%2FPositions%2F` +
        file,
      "get",
      Authheader
    )
      // 1. Convert the data into 'blob'
      .then((response) => response.blob())
      .then((blob) => {
        // 2. Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file);
        // 3. Append to html page
        document.body.appendChild(link);
        // 4. Force download
        link.click();
        // 5. Clean up and remove the link
        link.parentNode.removeChild(link);

        //.then((response) => {
      });

    // prevent form submit
    //event.preventDefault();
  }

  useEffect(() => {
    //Load Auth header
    getheader();
    // Pull out into a generic reusable function
    var HeaderAuth = "test";
    const getData = async (fileType) => {
      try {
        let apiName = "Fiji-Dev";
        let path = "/listfiles";
        let myInit = {
          headers: {
            filetype: fileType,
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          },
        };
        console.log("==========INIT with token==============");
        Array.isArray(myInit.headers);
        HeaderAuth = myInit.headers.Authorization;
        console.log("========================");

        var result = await API.get(apiName, path, myInit);
        console.log(result);
        setPositions(result); // set your files here;
      } catch (e) {
        if (e.message === "Request failed with status code 502") {
          setApiError502(true);
        } else {
          alert(JSON.stringify(e));
          props.onLogout();
        }
      }
    };
    // call getData
    getData("Positions");
    console.log(HeaderAuth);
  }, []);
  
  return (
    <div className="animated fadeIn">
             
      {Array.isArray(positions.Files) &&
        positions.Files.map((filetype) => {
          return (
            <div>
              {filetype.Positions.map(function (file) {
                return (
                  <div>
                    <div class="d-none d-sm-inline-block col-sm-6">
                      <button
                        onClick={() => handleSubmit(file.File)}
                        class="float-right btn btn-primary"
                      >
                        <i class="icon-cloud-download"></i>
                      </button>
                      <div
                        aria-label="Toolbar with button groups"
                        role="toolbar"
                        class="btn btn-outline-secondary"
                      >
                        <Row>
                          <Col xs="20" sm="60" lg="30">
                            <Card className="text-white bg-info">  
                        <div
                          aria-label="First group"
                          role="group"
                          class="mr-3 btn-group"
                        >
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                          >
                            {file.Bank}
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                          >
                            {file.File}
                          </button>
                        </div>
                        </Card>
                         </Col>
                          </Row>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
export default LoadPositionsFiles;