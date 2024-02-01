import { Auth } from "aws-amplify";

import config from "../../config";

function NewTemp() {
  return {
    userGroups: [],
    userInfo: {},
    isAuthed: false
  };
}
export async function GetUserDetails() {
  try {
    // const [userDetails, setUserDetails] = useState({});

    var temp = new NewTemp();

    var currentSession = await Auth.currentSession();
    temp.isAuthed = true; // If the above line worked, there is a valid sesison.

    temp.userGroups = currentSession.getAccessToken().payload["cognito:groups"];

    var currentSessionInfo = currentSession.getIdToken();

    var currentUser = await Auth.currentAuthenticatedUser();

    // console.log("currentSession");
    // console.log(currentSession);
    // console.log("currentSessionInfo");
    // console.log(currentSessionInfo);
    // console.log("currentUser");
    // console.log(currentUser);

    var userdetails = JSON.parse(
      currentUser.pool.storage[
        `CognitoIdentityServiceProvider.${config.cognito.APP_CLIENT_ID}.${currentUser.username}.userData`
      ]
    );
    var userAttributes = {};

    userdetails.UserAttributes.map(
      (i, c) =>
        (userAttributes[userdetails.UserAttributes[c]["Name"]] =
          userdetails.UserAttributes[c]["Value"])
    );

    var currentUserDetails = {
      id: currentSessionInfo.payload["cognito:username"],
      email: currentSessionInfo.payload.email,
      emailVerified: currentSessionInfo.payload.email_verified,
      phone: currentSessionInfo.payload.phone_number,
      phoneVerified: currentSessionInfo.payload.phone_number_verified,
      userAttributes: userAttributes
    };

    temp.userInfo = currentUserDetails;

    return temp;
  } catch (e) {
    if (e !== "No current user") {
      alert(e);
    }
    return new NewTemp();
  }
}
