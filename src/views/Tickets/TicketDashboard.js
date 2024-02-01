import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

import { Card, CardBody, CardColumns, CardHeader } from "reactstrap";

import { Auth, API } from "aws-amplify";

function TicketDashboard(props) {
  const [apiResult, setApiResult] = useState({});
  const [infiniteLoopStopper, toInfinity] = useState({}); //eslint-disable-line
  var apiResults = {};
  var graphdata = {};

  const options = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false
  };

  useEffect(() => {
    onLoad();
  }, [infiniteLoopStopper]); //eslint-disable-line

  const onLoad = async () => {
    apiResults = await getData();
    if (apiResults) {
      setApiResult(apiResults);
    }
  };

  // Pull out into a generic reusable function
  const getData = async () => {
    try {
      let apiName = "Fiji-Dev";
      let path = "/tickets/dashboard";
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
      } else {
        alert(JSON.stringify(e));
        props.onLogout();
      }
    }
    return result;
  };

  const formatGraphData = () => {
    console.log("test");

    for (var proj in apiResult) {
      var d = [];
      var l = [];
      var polar = {
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB"
            ],
            label: "" // for legend
          }
        ],
        labels: []
      };

      Object.values(apiResult[proj]["Counts"]).map(a => d.push(a)); //eslint-disable-line
      Object.keys(apiResult[proj]["Counts"]).map(a => l.push(a)); //eslint-disable-line

      polar.datasets[0].data = d;
      polar.labels = l;
      polar.datasets[0].label = proj;

      graphdata[apiResult[proj]["projectKey"]] = polar;
    }

    console.log(graphdata);
  };
  const StatGraphs = () => {
    formatGraphData();
    return (
      <CardColumns className="cols-2">
        {Object.keys(apiResult).map((p, i) => (
          <Card key={apiResult[p]["projectKey"]}>
            <CardHeader>Tickets by status: {p}</CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie
                  data={graphdata[apiResult[p]["projectKey"]]}
                  options={options}
                />
              </div>
            </CardBody>
          </Card>
        ))}
      </CardColumns>
    );
  };

  return (
    <div className="animated fadeIn">
      <StatGraphs />
    </div>
  );
}

export default TicketDashboard;
