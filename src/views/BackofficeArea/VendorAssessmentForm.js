import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import { Row } from "reactstrap";
import LoadingBlock from "../../components/loadingBlock/loadingBlock";

function VendorAssessmentForm(props, location) {
  const [formTitle, setFormTitle] = useState("Vendor Assessment"); //eslint-disable-line
  const [formModel, setForm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    onLoad();
  }, []); // eslint-disable-line

  const onLoad = async () => {
    setPageReady(false);

    if (!props.currentAssessment) {
      props.history.push("/vendor/dashboard");
    }

    setFormTitle(`${props.currentAssessmentCustomer}`);

    // console.log("props.match.params.id");
    //let params = new URLSearchParams(location.search);
    // console.log(params.get("vendor"));
    var currentUser = await Auth.currentAuthenticatedUser();
    // console.log("currentUser");
    // console.log(currentUser);
    var groups = await currentUser.signInUserSession.accessToken.payload[
      "cognito:groups"
    ];

    // console.log("groups");
    // console.log(groups);

    // Only vendors are allowed here
    if (groups.includes("Vendor")) {
    } else {
      props.history.push("/401");
    }

    await getData()
      .then(data => {
        // console.log("data");
        // console.log(data);
        var friendlyFields = data.body.friendly_questions;
        // console.log("friendlyFields");
        // console.log(friendlyFields);

        setForm(friendlyFields);
        figureOutPagination(friendlyFields);
        setIsLoading(false);
        setPageReady(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Pull out into a generic reusable function
  const getData = async () => {
    try {
      let apiName = "Fiji-Dev";
      let path = `/assessments/${props.currentAssessment}`;
      let myInit = {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`
        }
      };
      var result = await API.get(apiName, path, myInit);
      // console.log("result");
      // console.log(result);
    } catch (e) {
      if (e.message === "Request failed with status code 502") {
        //toggleApiError502(true);
      } else {
        console.log(e);
        //props.onLogout();
      }
    }
    return result;
  };
  const putData = async body => {
    setIsLoading(true);

    try {
      delete body.isLoading;
      let apiName = "Fiji-Dev";
      let path = `/assessments/${props.currentAssessment}`;
      let myInit = {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`
        },
        body
      };
      var result = await API.put(apiName, path, myInit);
      // console.log("result");
      // console.log(result);
    } catch (e) {
      if (e.message === "Request failed with status code 502") {
        //toggleApiError502(true);
      } else {
        console.log(e);
        //props.onLogout();
      }
      setIsLoading(false);
    }
    setIsLoading(false);

    return result;
  };

  const handleSubmit = async model => {
    console.log("submittedHere");
    console.log(model);

    putData(model);
  };

  const figureOutPagination = async model => {
    try {
      let categories = [...new Set(model.map(m => m.category))]; // Distinct list of the question categories
      // console.log("categories");
      // console.log(categories.length);
      setMaxPages(categories.length);
    } catch (e) {}
  };

  return (
    <div className="animated fadeIn">
      {pageReady ? (
        <Row>
          <DynamicForm
            className="form"
            //title={formTitle}
            model={formModel}
            onSubmit={model => {
              handleSubmit(model);
            }}
            isLoading={isLoading}
            cancelButton={props.backClick}
            cancelButtonText="Go back"
            visiblePage={0}
            maxPages={maxPages}
            pagination={true}
            assessmentId={props.currentAssessment}
          />
        </Row>
      ) : (
        <LoadingBlock />
      )}
    </div>
  );
}

export default VendorAssessmentForm;
