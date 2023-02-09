export default [
  {
    path: "/user",
    layout: false,

    routes: [
      {
        name: "setup-account",
        path: "/user/setup-account",
        component: "./User/setup",
      },
    ],
  },
  {
    path: "/auth",
    layout: false,
    routes: [
      {
        path: "/auth",
        routes: [
          {
            name: "login",
            path: "/auth/login",
            component: "./User/login",
          },
        ],
      },
    ],
  },

  // {
  //   path: "/dashboard",
  //   layout: true,
  //   icon: "dashboard",

  //   name: "Dashboard",
  //   routes: [
  //     {
  //       name: "Analysis",

  //       path: "/dashboard/analysis",
  //       component: "./Dashboard/analysis",
  //       access: "canAdmin",
  //     },
  //     {
  //       name: "Analysis2",
  //       path: "/dashboard/analysis2",
  //       component: "./Dashboard/analysis",
  //       access: "canClient",
  //     },

  //     {
  //       name: "Monitor",
  //       access: "canAdmin",
  //       path: "/dashboard/monitor",
  //       component: "./Dashboard/monitor",
  //     },
  //   ],
  // },

  {
    path: "/client",
    redirect: "/client/user",
  },
  {
    name: "list.client-management",
    icon: "user",
    access: "canAdmin",
    path: "/client",

    routes: [
      {
        path: "/client/user",
        name: "client-user",
        icon: "smile",
        component: "./UserManagement",
      },
      {
        path: "/client/company",
        name: "client-company",
        icon: "smile",
        component: "./CompanyManagement",
      },
    ],
  },
  {
    path: "/company/information",
    name: "Company Information",
    icon: "InsertRowRightOutlined",
    access: "canClient",
    component: "./CompanyInformation",
  },
  {
    path: "/company/drivers",
    name: "Driver Management",
    icon: "UserOutlined",
    access: "canClient",
    component: "./DriverManagement",
  },
  {
    path: "/company/vehicles",
    name: "Vehicle Management",
    icon: "CarOutlined",
    access: "canClient",
    component: "./VehicleManagement",
  },
  {
    exact: true,
    path: "/company/routes/create",
    name: "routes-create",
    component: "./RouteCreate",
    hideInMenu: true,
    access: "canClient",
  },
  {
    exact: true,
    path: "/company/routes",
    name: "Route Management",
    icon: "NodeIndexOutlined",
    component: "./RouteManagement",
    access: "canClient",
  },
  {
    exact: true,
    path: "/company/routes/:id",
    name: "routes-detail",
    icon: "branch",
    component: "./RouteDetail",
    hideInMenu: true,
    access: "canClient",
  },
  // {
  //   name: "list.company-management",
  //   icon: "user",
  //   access: "canClient",
  //   path: "/company",
  //   hideInMenu: true,

  //   routes: [
  //     {
  //       path: "/company/information",
  //       name: "company-information",
  //       icon: "smile",
  //       component: "./CompanyInformation",
  //     },
  //     {
  //       path: "/company/drivers",
  //       name: "drivers-management",
  //       icon: "smile",
  //       component: "./DriverManagement",
  //     },
  //     {
  //       path: "/company/vehicles",
  //       name: "vehicles-management",
  //       icon: "smile",

  //       component: "./VehicleManagement",
  //     },
  //     {
  //       exact: true,
  //       path: "/company/routes/create",
  //       name: "routes-create",
  //       component: "./RouteCreate",
  //       hideInMenu: true,
  //     },
  //     {
  //       exact: true,
  //       path: "/company/routes",
  //       name: "routes-management",
  //       icon: "branch",
  //       component: "./RouteManagement",
  //     },

  //     {
  //       exact: true,
  //       path: "/company/routes/:id",
  //       name: "routes-detail",
  //       icon: "branch",
  //       component: "./RouteDetail",
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  {
    name: "list.monitor-driver",
    icon: "video-camera",
    access: "canClient",
    path: "/monitor",
    component: "./DriverMonitor",
  },

  {
    path: "/system",
    redirect: "/system/information",
  },

  {
    name: "list.system-management",
    icon: "user",
    access: "canSuperAdmin",
    path: "/system",
    routes: [
      {
        path: "/system/admin",
        name: "admin-management",
        component: "./AdminManagement",
      },
      {
        path: "/system/information",
        name: "system-information",
        component: "./Admin",
      },
    ],
  },

  {
    name: "list.account-management",
    icon: "user",

    path: "/account",

    routes: [
      {
        path: "/account/centers",
        name: "account-center",
        component: "./Account/settings",
      },
      {
        path: "/account/settings",
        name: "account-setting",
        component: "./Account/settings",
      },
    ],
  },

  {
    path: "/",
    redirect: "/welcome",
  },

  {
    path: "/welcome",
    name: "Vehicle Management",
    component: './Welcome'
  },

  {
    component: "./404",
  },
];
