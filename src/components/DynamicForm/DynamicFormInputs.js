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
import { apiGET } from "../../Common/Api/apiHelper";

/// parent

function DynamicFormInputs(props) {
  const [state, setState] = useState({
    isLoading: false,
    dependencies: {},
    visiblePage: 0,
    maxPages: 0
  });
  const file = useRef(null); // useRef will not trigger component rerender on change

  /// static
  const renderStatic = fieldValue => {
    console.log("Rendering Static");
    return <p className="form-control-static">{fieldValue}</p>;
  };
  /// text
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

  /// file
  const renderFileInput = (type, key, fieldValue, fieldOrder) => {
    // console.log(`Rendering Input ${type}`);
    // console.log(state.dependencies["key"]);
    // console.log("fieldValueFile");
    // console.log(fieldValue);

    var hasValue = fieldValue !== "";
    return hasValue ? (
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

  /// radio
  const renderRadio = (options, key, fieldValue = -1) => {
    console.log("Rendering Radio");
    console.log(options);
    return (
      <span>
        {Object.keys(options)
          .sort((a, b) => a < b)
          .map((keyName, i) => (
            <FormGroup check className="radio">
              <Input
                className="form-check-input"
                type="radio"
                id={key}
                name={key}
                value={keyName}
                parent={key}
                onChange={e => {
                  onCheckboxChange(e);
                }}
                checked={keyName === fieldValue}
              />
              <Label check className="form-check-label" htmlFor={key}>
                {options[keyName]}
              </Label>
            </FormGroup>
          ))}
      </span>
    );
  };

  /// checkbox

  const renderCheckbox = (options, key) => {
    // console.log("Rendering Checkbox");
    return (
      <span>
        {Object.keys(options).map((keyName, i) => (
          <FormGroup check className="checkbox">
            <Input
              className="form-check-input"
              type="checkbox"
              id={key}
              name={key}
              value={keyName}
              parent={key}
              onChange={e => {
                onCheckboxChange(e);
              }}
            />
            <Label check className="form-check-label" htmlFor={keyName}>
              {options[keyName]}
            </Label>
          </FormGroup>
        ))}
      </span>
    );
  };
  /// select
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

  // WTF was I thinking here...
  const onCheckboxChange = e => {
    console.log("e.target");
    console.log(e.target);
    var inputField = e.target.name;
    var inputValue = e.target.value;
    var stateTemp = { ...state };
    var tempArray = [];
    if (e.target.checked) {
      if (stateTemp[inputField]) {
        tempArray[inputField] = stateTemp[inputField];

        tempArray[inputField] = inputValue;
      } else {
        tempArray[inputField] = inputValue;
      }
      stateTemp[inputField] = tempArray;
    } else {
      if (stateTemp[inputField]) {
        tempArray = stateTemp[inputField];
      }
      tempArray = tempArray.filter(item => item !== e.target.id);
    }
    stateTemp[inputField] = inputValue;
    setState({ ...stateTemp });
    console.log("stateTemp");
    console.log(stateTemp);

    var fieldObject = findFieldByKey(props.model, inputField);
    if (fieldObject.onChange) {
      fieldObject.onChange(e, stateTemp);
    }
  };

  // Update local state, call parent onChange if any.
  const onChange = e => {
    var stateTemp = { ...state };
    stateTemp[e.target.id] = e.target.value;
    setState({ ...stateTemp });
    // console.log("stateTemp");
    // console.log(stateTemp);

    var fieldObject = findFieldByKey(props.model, e.target.id);
    if (fieldObject.onChange) {
      fieldObject.onChange(e, stateTemp);
    }
  };

  // Upload the file to S3
  /// Validate the file input (file type, size etc...)
  /// GET the presigned url
  /// PUT the file using the presigned url
  const onFileChange = async e => {
    setState({ ...state, isLoading: true });
    console.log("e.target");
    console.log(e.target);
    console.log(e.target.attributes["order"].value);
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
    console.log("Getting presigned url");
    var presignedUrl = await getPresignedUrl(`${fileName}.${fileExt}`);
    console.log(presignedUrl);

    // upload the file.
    try {
      var fileTest = await fetch(presignedUrl["body"], {
        method: "PUT",
        body: file.current,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(response => response.json());

      console.log("fileTest");
      console.log(fileTest);
    } catch (e) {
      if (e.message === "Request failed with status code 502") {
        //toggleApiError502(true);
      } else {
        console.log(e);
        //props.onLogout();
      }
    }

    var stateTemp = { ...state };
    stateTemp[fieldId] = file.current.name;
    setState({ ...stateTemp });
    console.log("MystateTemp");
    console.log(stateTemp);

    if (props.onSubmit) props.onSubmit(stateTemp);
    setState({ ...state, isLoading: false });
  };

  const getPresignedUrl = async fileName => {
    return apiGET(`/files/presignedurl?fileName=${fileName}`);
  };

  function findFieldByKey(array, keyval) {
    return array.find(field => {
      return field.key === keyval;
    });
  }

  return (
    <>
      {(() => {
        switch (props.fieldType) {
          case "select":
            return renderSelect(props.options, props.key, props.fieldValue);
          case "radio":
            return renderRadio(props.options, props.key, props.fieldValue);
          case "checkbox":
            return renderCheckbox(props.options, props.key);
          case "text":
            return renderInput(props.fieldType, props.key, props.fieldValue);
          case "textarea":
            return renderInput(props.fieldType, props.key, props.fieldValue);
          case "date":
            return renderInput(props.fieldType, props.key, props.fieldValue);
          case "tel":
            return renderInput(props.fieldType, props.key, props.fieldValue);
          case "file":
            return renderFileInput(
              props.fieldType,
              props.key,
              props.fieldValue,
              props.fieldOrder
            );
          default:
            return renderStatic(props.fieldValue);
        }
      })()}
    </>
  );
}

export default DynamicFormInputs;
