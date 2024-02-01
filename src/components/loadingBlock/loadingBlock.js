import React from "react";
import { Spinner } from "reactstrap";
import "./loadingBlock.scss";

export default function LoadingBlock({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <div className="animated fadeIn pt-3 pb-3 text-center">
      <Spinner
        size={props.size ? props.size : "sm"}
        color={props.color ? props.color : "dark"}
        type={props.type ? props.type : "grow"}
      />{" "}
      Loading...
    </div>
  );
}
