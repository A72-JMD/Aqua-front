import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import { Button, CardBody, Row } from "reactstrap";
import LoadingBlock from "../../components/loadingBlock/loadingBlock";

function VendorDashboardContent(props) {
  const [vendorAssessments, setVendorAssessments] = useState([]);
  const [pageReady, setPageReady] = useState(false);

  const statusMap = {
    in_progress: "In progress",
    not_started: "Not started"
  };

  useEffect(() => {
    onLoad();
  }, []); //eslint-disable-line

  const onLoad = async () => {
    setPageReady(false);
    await getData()
      .then(data => {
        // console.log("data.body");
        // console.log(data.body);
        setVendorAssessments(data.body);
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
      let path = "/assessments/list";
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
        //toggleApiError502(true);
      } else {
        console.log(e);
        //props.onLogout();
      }
    }
    return result;
  };

  const handleClick = e => {
    console.log(e.target.name);
    props.setCurrentAssessment(e.target.id);
    props.setCurrentAssessmentCustomer(e.target.name);
    props.setViewForm(e.target.name);
  };

  return (
    <CardBody>
      {pageReady ? (
        vendorAssessments.map((i, c) => (
          <Row key={c}>
            <div>
              <Button
                size="sm"
                color="link"
                type="reset"
                onClick={handleClick}
                id={i.assessment_id}
                name={i.customer}
              >
                {`${i.customer} - ${statusMap[i.status]}`}
              </Button>
            </div>
          </Row>
        ))
      ) : (
        <LoadingBlock />
      )}
    </CardBody>
  );
}

export default VendorDashboardContent;
