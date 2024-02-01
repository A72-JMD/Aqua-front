import React from "react";
import ReactDOM from "react-dom";
import RegisterVendor from "./RegisterVendor";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RegisterVendor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
