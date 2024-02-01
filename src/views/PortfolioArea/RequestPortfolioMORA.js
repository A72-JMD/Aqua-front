import React, { useState, useEffect, Component } from "react";
import { Auth, API } from "aws-amplify";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import Helpers from "../../Common/helpers.js";
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

function LoadTransactionFiles(props) {
  const [apiError502, setApiError502] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [Authheader, setHeader] = useState();

  const getheader = async () => {
    var result = `Bearer ${(await Auth.currentSession()) //Call aws-aplyfy Auth method
      .getIdToken()
      .getJwtToken()}`;
    setHeader(result); // set the auth header here;
    return result;
  };
  async function handleSubmit(file) {
    console.log("==========get argument==============");
    console.log(file);
    console.log("========================");
    Helpers.httpRequest(
      `https://ww8jinvodc.execute-api.ap-southeast-2.amazonaws.com/V1/fiji-web-files/Banks%2FLGT%2FTransactions%2F` +
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
        var result = await API.get(apiName, path, myInit);
        console.log(result);
        setTransactions(result); // set your files here;
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
    getData("Transactions");
  }, []);
  return (
    <div>
      {Array.isArray(transactions.Files) &&
        transactions.Files.map((filetype) => {
          return (
            <div>
              {filetype.Transactions.map(function (file) {
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
                        class="float-right btn-toolbar"
                      >
                        <div
                          aria-label="First group"
                          role="group"
                          class="mr-3 btn-group"
                        >
                          <button
                            type="button"
                            class="btn btn-outline-secondary active"
                          >
                            {file.Bank}
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                          >
                            {file.File}
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                          >
                            Status
                          </button>
                        </div>
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
export default LoadTransactionFiles;
