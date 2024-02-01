export default {
  apiGateway: {
    NAME: "Fiji-Dev",
    REGION: "ap-southeast-2",
    URL: "https://ww8jinvodc.execute-api.ap-southeast-2.amazonaws.com/V01"
  },
  // cognito: {
  //   REGION: "ap-southeast-2",
  //   USER_POOL_ID: "ap-southeast-2_7XLZsmvnW",
  //   AUTH_URL:
  //     "https://fortian-login.auth.ap-southeast-2.amazoncognito.com/login/",
  //   REDIRECT_URL: "http://localhost:4200/auth/oauth2/callback/",
  //   APP_CLIENT_ID: "1e1ocgioop4r2cfmla6vblgj9g"
  // }
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_nisg14d0z",
    AUTH_URL:
      "https://fiji-dev.auth.ap-southeast-2.amazoncognito.com/login/",
    REDIRECT_URL: "http://localhost:4200/auth/oauth2/callback/",
    APP_CLIENT_ID: "2100olpm7712gij41jdsog9ps9"
  }
};
