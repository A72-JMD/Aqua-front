import { Auth, API } from "aws-amplify";

class apiTester {
  testGet = async () => {
    try {
      let apiName = "Fiji-Dev";

      let path = "/test_lambda";
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

  testPost = async bdy => {
    try {
      let apiName = "Fiji-Dev";
      let body = bdy;
      let path = "/test_lambda";
      let myInit = {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`
        },
        body
      };
      var result = await API.post(apiName, path, myInit);
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
}
export default apiTester;
