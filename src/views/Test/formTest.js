import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import { Row } from "reactstrap";
import LoadingBlock from "../../components/loadingBlock/loadingBlock";
import { apiGET, apiPOST } from "../../Common/Api/apiHelper";
import queryString from "query-string";

function FormTest(props) {
  const [formTitle, setFormTitle] = useState("Vendor Assessment"); //eslint-disable-line
  const [formModel, setForm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [maxPages, setMaxPages] = useState(1);

  const mock = [
    {
      category: "Information Security Governance, Policy, Compliance",
      key: "04c07082-2ab4-11ea-9476-ae3e727d6468",
      label: "mock question required",
      order: 1,
      tier: 1,
      type: "text",
      value: "",
      validation: {
        required: true,
        length: 10
      }
    },
    {
      category: "Information Security Governance, Policy, Compliance",
      key: "ae3e727d6468-2ab4-11ea-9476-04c07082",
      label: "mock question two",
      order: 1,
      tier: 1,
      type: "text",
      value: "",
      validation: {
        required: false,
        length: 13
      }
    }
  ];

  const mockFormModel = [
    {
      label: "Domain",
      subtext: "Null",
      question_ref: "ISABCM_77",
      key: "domain",
      type: "text",
      validations: [
        {
          value: true,
          rulename: "mandatory",
          errormsg: "This question is required."
        }
      ],
      dependencies: [],
      value: ""
    }
  ];

  useEffect(() => {
    onLoad();
  }, []); // eslint-disable-line

  const onLoad = async () => {
    setForm(mockFormModel);

    console.log("props.match.params.id");
    let params = queryString.parse(props.location.search);
    console.log(params);
    console.log(params.jwt ? true : false);
    console.log(props);

    setPageReady(true);
    await getData()
      .then(data => {
        setIsLoading(false);
        setPageReady(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Pull out into a generic reusable function
  const getData = async () => {
    console.log("got here");
    return await apiGET(`/test_lambda`);
  };

  const postData = async body => {
    setIsLoading(true);
    var result = await apiPOST(`/test_lambda`, body);
    setIsLoading(false);
    return result;
  };

  const handleSubmit = async model => {
    console.log("submittedHere");
    console.log(model);

    postData(model);
  };

  return (
    <div className="animated fadeIn">
      {pageReady ? (
        <Row>
          <DynamicForm
            className="form"
            model={formModel}
            onSubmit={model => {
              handleSubmit(model);
            }}
          />
        </Row>
      ) : (
        <LoadingBlock />
      )}
    </div>
  );
}

export default FormTest;
