import React, { useState, useEffect } from "react";
// import DynamicForm from "../../components/DynamicForm/DynamicForm";
import { Card, CardHeader, Col, Row } from "reactstrap";
import VendorAssessmentForm from "../BackofficeArea/VendorAssessmentForm";
import VendorDashboardContent from "./VendorDashboardContent";

function VendorDashboard(props) {
  const [pageTitle, setPageTitle] = useState("Vendor Dashboard");
  // const [formModel, setForm] = useState([]);
  const [viewForm, setViewForm] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState("");
  const [currentAssessmentCustomer, setCurrentAssessmentCustomer] = useState(
    ""
  );
  useEffect(() => {
    onLoad();
  }, []); //eslint-disable-line

  const onLoad = async () => {
    // Only vendors are allowed here
    if (props.userDetails.userGroups.includes("Vendor")) {
    } else {
      props.history.push("/401");
    }
  };

  const handleClick = (customerName) => {
    setViewForm(!viewForm);
    setPageTitle(`Vendor Assessment - ${customerName}`);
  };

  const clearTitle = () => {
    setViewForm(false);
    setPageTitle("Vendor Dashboard");
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <h2>{pageTitle}</h2>
            </CardHeader>

            {(() => {
              if (viewForm) {
                return (
                  <VendorAssessmentForm
                    {...props}
                    currentAssessment={currentAssessment}
                    currentAssessmentCustomer={currentAssessmentCustomer}
                    backClick={clearTitle}
                  ></VendorAssessmentForm>
                );
              } else {
                return (
                  <VendorDashboardContent
                    {...props}
                    setViewForm={handleClick}
                    viewForm={viewForm}
                    setCurrentAssessment={setCurrentAssessment}
                    setCurrentAssessmentCustomer={setCurrentAssessmentCustomer}
                  />
                );
              }
            })()}

            {/* <CardFooter></CardFooter> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default VendorDashboard;
