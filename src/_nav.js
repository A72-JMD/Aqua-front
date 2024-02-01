export default {
  items: [
    {
      name: "Aqua Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
    },
    {
      divider: true,
    },
    {
      title: true,
      name: "Backoffice Area",
    },
    {
      name: "Custodian Files",
      icon: "icon-plus",
      children: [
                {
                  name: "Positions Files",
                  url: "/BackofficeArea/Positions",
                  icon: "icon-book-open",
                },
                {
                  name: "Transactions Files",
                  url: "/BackofficeArea/transactions",
                  icon: "icon-book-open",
                },
                {
                  name: "Addepar Files",
                  url: "/BackofficeArea/ImportExternal",
                  icon: "icon-book-open",
                }
      ],
    },
    {
      divider: true,
    },
    {
      title: true,
      name: "Portoflio Area",
    },

    {
      name: "by Banks",
      icon: "icon-pie-chart",
      children: [
        {
          name: "LGT",
          url: "/PortfolioArea/LGT",
          icon: "icon-plus",
        },
        {
          name: "MORA",
          url: "/PortfolioArea/MORA",
          icon: "icon-plus",
        },
      ],
    },
    {
      name: "by Manager relationship",
      url: "/vendor/dashboard",
      icon: "cui-dashboard",
    },
    {
      title: true,
      name: "Compliance Area",
    },
    {
      name: "Files",
      icon: "icon-book-open",
      children: [
        {
          name: "Miami Files",
          url: "/ComplianceFiles/SharedFiles",
          icon: "icon-plus",
        },
        {
          name: "Zurich Files",
          url: "/ComplianceFiles/SharedFilesZurich",
          icon: "icon-plus",
        },
      ],
    },
    {
      title: true,
      name: "Management Area",
      icon: "icon-speedometer",
    },
    {
      name: "Files",
      icon: "icon-star",
      children: [
        {
          name: "Miami Files",
          url: "/ComplianceFiles/SharedFiles",
          icon: "icon-plus",
        },
        {
          name: "Zurich Files",
          url: "/ComplianceFiles/SharedFilesZurich",
          icon: "icon-plus",
        },
      ],
    },
    // ,
    // {
    //   name: "Vendor Assessment",
    //   url: "/vendor/assessment",
    //   icon: "icon-list"
    // }
  ],
};
