import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { apiGET } from "../../Common/Api/apiHelper";

export default function DynamicForm(props) {
  const [state, setState] = useState({
    isLoading: false,
    doneBuildingModel: false,
    dependencies: {},
    formModel: {}
  });
  const [visiblePage, setVisiblePage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  // const [validationSuccess, setValidationSuccess] = useState(false);
  const [minPage, setMinPage] = useState(0); //eslint-disable-line

  const file = useRef(null); // useRef will not trigger component rerender on change

  var validationRules = [{}];

  useEffect(() => {
    const fetchData = async () => {
      await onLoad();
    };
    fetchData();
  }, []); //eslint-disable-line

  // When the component loads, update state with any pre-filled values
  const onLoad = () => {
    // console.log("ON LOAD TRIGGERED");
    let model = props.model;
    var stateTemp = { ...state };
    console.log("JMD-");

    setVisiblePage(props.visiblePage ? props.visiblePage : 0);
    setMaxPages(props.maxPages ? props.maxPages : 1);

    stateTemp.formModel = model;

    // console.log("DUMP: ", stateTemp.formModel);
    stateTemp.doneBuildingModel = true;

    setState({ ...stateTemp });
  };

  const performValidation = () => {
    var success = true;
    // console.log("validating...");
    try {
      // console.log("validationRules");
      // console.log(validationRules);
      // console.log("state");
      // console.log(state);
      Object.keys(state.formModel).map(function(key) {
        console.log(validationRules[key].required);

        // TODO trigger validation message useful tot he specific field
        if (validationRules[key].required && state.formModel[key].length <= 0) {
          success = false;
        }

        if (state.formModel[key].length > 0) {
          if (state.formModel[key].length < validationRules[key].length) {
            success = false;
          }
        }
      });

      // validationRules.map((i, c) => {
      //   console.log(i);
      //   console.log(validationRules[i]);
      //   if (validationRules[c]["rules"]["required"]) {
      //     if (state[validationRules[c].field].length === 0) {
      //       setValidationSuccess(false);
      //     }
      //   }
      // });
    } catch (e) {}
    return success;
  };

  const setValidationRules = async model => {
    // model.map((i, c) => {
    //   console.log(Object.keys(model[c].validation));
    //   console.log(Object.values(model[c].validation));
    // });

    model.map((i, c) => {
      var key = model[c].key;
      var x = {
        //field: key,
      };
      validationRules[key] = {
        ...model[c].validation
      };
    });
  };

  const handleSubmit = async event => {
    console.log("submitted");
    event.preventDefault();

    let model = state.formModel;
    let formValues = {};

    model.map(m => {
      if (m.options) {
        formValues[m.key] = m.value || Object.keys(m.options)[0].toString();
      } else {
        formValues[m.key] = m.value || "";
      }
    });

    if (performValidation()) {
      setState({ ...state, isLoading: true });
      if (props.onSubmit) props.onSubmit(formValues);
      setState({ ...state, isLoading: false });
      console.log("Validation Success");
    } else {
      alert("Validation Failed");
    }
  };

  const updateMultiFieldValue = (guid, newValue, selected) => {
    var stateTemp = { ...state };

    var index = stateTemp.formModel.findIndex(object => {
      return object.key === guid;
    });

    if (index > -1) {
      var vals = [];
      if (stateTemp.formModel[index]["value"] === "")
        stateTemp.formModel[index]["value"] = vals;

      vals = stateTemp.formModel[index]["value"];
      if (selected) vals.push(newValue);
      else vals = vals.filter(x => x !== newValue);

      stateTemp.formModel[index]["value"] = vals;
    } else console.log("Failed to find index in model");

    setState({ ...stateTemp });
  };

  const updateFieldValue = (guid, newValue) => {
    var stateTemp = { ...state };

    var index = stateTemp.formModel.findIndex(object => {
      return object.key === guid;
    });

    if (index > -1) stateTemp.formModel[index]["value"] = newValue;
    else console.log("Failed to find index in model");

    setState({ ...stateTemp });
  };

  function findFieldByKey(keyval) {
    let index = state.formModel.findIndex(object => {
      return object.key === keyval;
    });

    if (index > -1) return state.formModel[index];
    else console.log("findFieldByKey() failed to find index");
    return null;
  }

  // Update local state, call parent onChange if any.
  //TODO: CHANGE ALL TO USE ON CHANGE
  const onChange = e => {
    var inputField = e.target.name;
    var desiredValue = e.target.value;
    updateFieldValue(inputField, desiredValue);

    var fieldObject = findFieldByKey(inputField);
    if (fieldObject.onChange) {
      fieldObject.onChange(e, state);
    }
  };

  const onRadioChange = e => {
    var inputField = e.target.name;
    var desiredValue = e.target.value;
    updateFieldValue(inputField, desiredValue);

    var fieldObject = findFieldByKey(inputField);
    if (fieldObject.onChange) {
      fieldObject.onChange(e, state);
    }
  };

  const onCheckboxChange = e => {
    // console.log("e.target");
    // console.log(e.target);

    var inputField = e.target.name;
    var desiredValue = e.target.value;
    var wasChecked = e.target.checked;
    updateMultiFieldValue(inputField, desiredValue, wasChecked);

    var fieldObject = findFieldByKey(inputField);
    if (fieldObject.onChange) {
      fieldObject.onChange(e, state);
    }
  };

  const getPresignedUrl = async fileName => {
    return apiGET(
      `/files/presignedurl?fileName=${fileName}&assessment=${props.assessmentId}`
    );
  };

  // Upload the file to S3
  /// Validate the file input (file type, size etc...)
  /// GET the presigned url
  /// PUT the file using the presigned url
  const onFileChange = async e => {
    setState({ ...state, isLoading: true });
    // console.log("e.target");
    // console.log(e.target);
    // console.log(e.target.attributes["order"].value);
    file.current = e.target.files[0];
    var fileName = e.target.attributes["order"].value;
    var fileExt = file.current.name.split(".").pop();
    var fieldId = e.target.id;

    // basic file validation to make sure it works.
    var maxFileSize = 5000000;
    // basic file size validation:
    if (file.current && file.current.size > maxFileSize) {
      alert(`Please pick a file smaller than ${maxFileSize / 1000000} MB.`);
      return;
    }

    // Get a presigned url.
    //console.log("Getting presigned url");
    var presignedUrl = await getPresignedUrl(`${fileName}.${fileExt}`);
    //console.log(presignedUrl);

    // upload the file.
    try {
      var fileTest = await fetch(presignedUrl["body"], {
        method: "PUT",
        body: file.current,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(response => response.json());

      // console.log("fileTest");
      // console.log(fileTest);
    } catch (e) {
      if (e.message === "Request failed with status code 502") {
        //toggleApiError502(true);
      } else {
        console.log(e);
        //props.onLogout();
      }
    }

    var stateTemp = { ...state };

    updateFieldValue(fieldId, file.current.name);
    //stateTemp.formModel[fieldId] = file.current.name;

    setState({ ...stateTemp });

    if (props.onSubmit) props.onSubmit(stateTemp);
    setState({ ...state, isLoading: false });
  };

  const setDependencyRules = model => {
    var stateTemp = { ...state };

    model.map((m, c) => {
      if (m.dependencies.length > 0) {
        stateTemp["dependencies"][m.key] = m.dependencies;
      }
    });
  };

  /// TODO: Implement hide/show dependent questions.
  const hideField = () => {};

  const showField = () => {};

  /// Pagination functions

  // Go to the next page
  // Make sure that the next page exists before setting it.
  const nextPage = e => {
    e.preventDefault(); // Stop the form from submitting and triggering validation for now
    // apparently ! for 'not' doesn't work in react ¯\_(ツ)_/¯
    if (visiblePage + 2 > maxPages) {
      console.log(
        `${visiblePage + 2} is greater than the max pages ${maxPages}`
      );
    } else {
      setVisiblePage(visiblePage + 1);
    }
  };

  // Go to the previous page.
  // Make sure that the previous page exists before setting it.
  const prevPage = e => {
    e.preventDefault(); // Stop the form from submitting and triggering validation for now

    if (visiblePage - 1 < minPage) {
      console.log(`${visiblePage - 1} is less than the min pages ${minPage}`);
    } else {
      setVisiblePage(visiblePage - 1);
    }
  };

  // Go to a specific page
  // Make sure that the page exists before setting it.
  const setPage = (e, i) => {
    e.preventDefault(); // Stop the form from submitting and triggering validation for now

    // console.log("setting the page");
    // console.log(`page: ${i}, min: ${minPage}, max:${maxPages}`);
    if (i + 1 >= minPage && i + 1 <= maxPages) {
      setVisiblePage(i);
    } else {
      console.log(`${i} is out of bounds.`);
    }
  };

  /// Field render functions
  const renderStatic = fieldValue => {
    // console.log("Rendering Static");
    return <p className="form-control-static">{fieldValue}</p>;
  };

  const renderCheckbox = (options, key, fieldValue = -1) => {
    // console.log("Rendering Checkbox");
    var selectedValues = [];
    var index = state.formModel.findIndex(object => {
      return object.key === key;
    });

    if (index > -1) selectedValues = state.formModel[index]["value"];
    else console.log("Failed to find index in model");

    return (
      <span>
        {Object.keys(options).map((keyName, i) => (
          <FormGroup check className="checkbox" key={`${i}checkboxformgroup`}>
            <Input
              className="form-check-input"
              type="checkbox"
              id={`${key}_${keyName}`}
              name={key}
              value={keyName}
              parent={key}
              onChange={e => {
                onCheckboxChange(e);
              }}
              checked={selectedValues.includes(keyName)}
            />
            <Label
              check
              className="form-check-label"
              htmlFor={`${key}_${keyName}`}
            >
              {options[keyName]}
            </Label>
          </FormGroup>
        ))}
      </span>
    );
  };

  const getInput = (isChecked, key, keyName) => {
    if (isChecked === true)
      return (
        <Input
          className="form-check-input"
          type="radio"
          id={`${key}_${keyName}`}
          questionId={key}
          name={key}
          value={keyName}
          parent={key}
          onChange={e => {
            onRadioChange(e);
          }}
          checked={true}
        />
      );
    else
      return (
        <Input
          className="form-check-input"
          type="radio"
          id={`${key}_${keyName}`}
          questionId={key}
          name={key}
          value={keyName}
          parent={key}
          onChange={e => {
            onRadioChange(e);
          }}
        />
      );
  };

  const renderRadio = (options, key, q_ref, fieldValue = -1) => {
    //console.log("Rendering Radio");
    // console.log(options);
    // console.log(key);
    //console.log(fieldValue);
    return (
      <span>
        {Object.keys(options)
          .sort((a, b) => a < b)
          .map((keyName, i) => (
            <FormGroup key={`${i}radioformgroup`} check className="radio">
              {getInput(keyName === fieldValue, key, keyName)}
              <Label
                check
                className="form-check-label"
                htmlFor={`${key}_${keyName}`}
              >
                {options[keyName]}
              </Label>
            </FormGroup>
          ))}
      </span>
    );
  };

  const renderSelect = (options, key, fieldValue) => {
    // console.log("Rendering Select");
    return (
      <div>
        <Input
          {...props}
          type="select"
          id={key}
          name={key}
          key={`${key}input`}
          defaultValue={fieldValue}
          onChange={e => {
            onChange(e);
          }}
          required
          className="form-control"
        >
          {Object.keys(options).map((keyName, i) => (
            <option
              key={`${i}selectOption`}
              value={keyName}
              selected={options[keyName] === fieldValue ? "selected" : ""}
            >
              {options[keyName]}
            </option>
          ))}
        </Input>
      </div>
    );
  };

  const renderInput = (type, key, fieldValue) => {
    // console.log(`Rendering Input ${type}`);
    // console.log(state.dependencies["key"]);
    return (
      <div>
        <Input
          {...props}
          type={type}
          id={key}
          name={key}
          key={`${key}input`}
          defaultValue={fieldValue}
          onChange={e => {
            onChange(e);
          }}
          required
          className="form-control"
        ></Input>
      </div>
    );
  };

  const renderFileInput = (type, key, fieldValue, fieldOrder) => {
    // console.log(`Rendering Input ${type}`);
    // console.log(state.dependencies["key"]);
    // console.log("fieldValueFile");
    // console.log(fieldValue);

    var hasValue = fieldValue !== "";
    return hasValue === true ? (
      renderStatic(fieldValue)
    ) : (
      <div>
        <Input
          {...props}
          type={type}
          id={key}
          name={key}
          key={`${key}input`}
          onChange={e => {
            onFileChange(e);
          }}
          order={fieldOrder}
          data-order={fieldOrder}
          required
          className="form-control"
        ></Input>
      </div>
    );
  };

  // Assuming for now there will always be at least one page.
  const renderPagination = maxPages => {
    return (
      <Pagination listClassName="justify-content-center">
        <PaginationItem disabled={visiblePage === 0}>
          <PaginationLink previous onClick={e => prevPage(e)} href="#" />
        </PaginationItem>
        {[...Array(maxPages)].map((page, i) => (
          <PaginationItem active={i === visiblePage} key={i}>
            <PaginationLink onClick={e => setPage(e, i)} href="#">
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={visiblePage + 1 === maxPages}>
          <PaginationLink next onClick={e => nextPage(e)} href="#" />
        </PaginationItem>
      </Pagination>
    );
  };

  const renderTest = model => {
    try {
      return (
        <>
          {/* {model.map((mod, i) => {
            return ( */}
          {Object.keys(model[visiblePage]).map((keyName, i) => (
            <>
              <h3>{keyName}</h3>
              <p></p>
              {/* <p> {JSON.stringify(mod[keyName])}</p> */}
              <div>
                {model[visiblePage][keyName]
                  .sort((a, b) => a.order > b.order)
                  .map(m => {
                    let key = m.key;
                    let type = m.type || "text";
                    let props = m.props || {};
                    let placeholder = m.placeholder || "";
                    let fieldValue = m.value || "";
                    let options = m.options || {};
                    let questionRef = m.question_ref;

                    setValidationRules(model[visiblePage][keyName]);
                    setDependencyRules(model[visiblePage][keyName]);

                    return (
                      <FormGroup row key={`${key}label`}>
                        <Col md="3">
                          <Label htmlFor={key}>
                            {m.order} - {m.label}
                          </Label>
                        </Col>
                        <Col xs="12" md="9">
                          {(() => {
                            switch (type) {
                              case "select":
                                return renderSelect(options, key, fieldValue);
                              case "radio":
                                return renderRadio(
                                  options,
                                  key,
                                  questionRef,
                                  fieldValue
                                );
                              case "checkbox":
                                return renderCheckbox(options, key, fieldValue);
                              case "text":
                                return renderInput(type, key, fieldValue);
                              case "textarea":
                                return renderInput(type, key, fieldValue);
                              case "date":
                                return renderInput(type, key, fieldValue);
                              case "tel":
                                return renderInput(type, key, fieldValue);
                              case "file":
                                return renderFileInput(
                                  type,
                                  key,
                                  fieldValue,
                                  m.order
                                );
                              default:
                                return "renderStatic(fieldValue)";
                            }
                          })()}
                        </Col>
                      </FormGroup>
                    );
                  })}
              </div>
            </>
          ))}
          {/* );
           })} */}
          {renderPagination(maxPages)}
        </>
      );
    } catch (e) {
      return <div>{e.message}</div>;
    }
  };

  const renderForm = () => {
    // console.log("Form model");
    // console.log(props.model);
    let model = state.formModel;

    if (props.pagination === true) {
      let categories = [...new Set(model.map(m => m.category))]; // Distinct list of the question categories
      var paginatedModel = categories.map(cat => {
        var temp = {};
        temp[cat] = model.filter(i => {
          return i.category === cat;
        });
        return temp;
      });

      // console.log("y");
      // console.log(paginatedModel);
      return renderTest(paginatedModel);
    }
  };

  return (
    <Col md="12">
      <Card>
        <Form
          className="needs-validation"
          noValidate
          onSubmit={e => {
            handleSubmit(e);
          }}
          method="post"
        >
          {(() => {
            if (props.title) {
              return (
                <CardHeader>
                  <strong>{props.title}</strong>
                </CardHeader>
              );
            } else {
            }
          })()}
          <CardBody>
            {state.doneBuildingModel === true && renderForm()}
          </CardBody>
          <CardFooter>
            <div></div>
            <LoaderButton
              size="sm"
              color="primary"
              type="submit"
              isLoading={state.isLoading}
              className="mx-1"
              //   onClick={e => {
              //     handleSubmit(e);
              //   }}
            >
              Save
            </LoaderButton>

            {(() => {
              if (props.cancelButton) {
                return (
                  <Button
                    size="sm"
                    color="link"
                    type="reset"
                    className="mx-1"
                    onClick={props.cancelButton}
                  >
                    {props.cancelButtonText}
                  </Button>
                );
              } else {
              }
            })()}

            {/* {props.maxPages ? renderPagination(state.maxPages) : ""} */}
          </CardFooter>
        </Form>
      </Card>
    </Col>
  );
}
