import { Auth, API } from "aws-amplify";

import config from "../../config";

export async function apiGET(apiPath, authenticated = true) {
  try {
    console.log("Test Getting");
    let apiName = config.apiGateway.NAME;
    let path = apiPath;
    let myInit = authenticated
      ? {
          headers: {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`
          }
        }
      : "";
    var result = await API.get(apiName, path, myInit);
    console.log("GET result");
    console.log(result);
  } catch (e) {
    if (e.message === "Request failed with status code 502") {
    } else if (e.message === "Request failed with status code 400") {
      return null;
    } else {
      console.log(e);
    }
  }
  return result;
}

/// GET
/// POST
export async function apiPOST(apiPath, body) {
  try {
    delete body.isLoading;
    let apiName = config.apiGateway.NAME;
    let path = apiPath;
    let myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`
      },
      body
    };
    var result = await API.post(apiName, path, myInit);
    console.log("POST result");
    console.log(result);
  } catch (e) {
    if (e.message === "Request failed with status code 502") {
    } else {
      console.log("POST ERROR");
      console.log(e);
    }
  }
  return result;
}

/// PUT

export async function apiPUT(apiPath, body) {
  try {
    delete body.isLoading;
    let apiName = config.apiGateway.NAME;
    let path = apiPath;
    let myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`
      },
      body
    };
    var result = await API.put(apiName, path, myInit);
    console.log("PUT result");
    console.log(result);
  } catch (e) {
    if (e.message === "Request failed with status code 502") {
    } else {
      console.log("PUT ERROR");
      console.log(e);
    }
  }
  return result;
}
