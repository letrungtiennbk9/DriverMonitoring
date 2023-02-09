/* eslint-disable no-duplicate-imports */
/* eslint-disable react/display-name */
import type { Settings as LayoutSettings } from "@ant-design/pro-layout";
import { PageLoading } from "@ant-design/pro-layout";
import { notification, Select } from "antd";
import type { RequestConfig, RunTimeLayoutConfig } from "umi";
import { history } from "umi";
import RightContent from "@/components/RightContent";
import Footer from "@/components/Footer";
import type {
  ResponseError,
  RequestOptionsInit,
  RequestInterceptor,
} from "umi-request";
import { currentUser as queryCurrentUser } from "./services/ant-design-pro/api";
import {
  BookOutlined,
  LinkOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
const isDev = process.env.NODE_ENV === "development";

export const initialStateConfig = {
  loading: <PageLoading />,
};

const unauthorizedPath = ["/auth/login", "/user/setup-account"];

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  currentCompany?: API.Company;
  fetchUserInfo?: () => Promise<any>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrentUser();
      return currentUser as API.CurrentUser;
    } catch (error) {
      history.push("/auth/login");
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (!unauthorizedPath.includes(history.location.pathname)) {
    const currentUser = await fetchUserInfo();
    const currentCompany = +(localStorage.getItem(
      `${(currentUser! as any).id}.currentCompany`
    ) as any);
    return {
      fetchUserInfo,
      currentUser,
      currentCompany:
        currentCompany ||
        (currentUser.companies.length > 0 ? currentUser.companies[0].id : null),
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

const CollapseButton = ({
  isCollapse,
  setCollapsed,
}: {
  isCollapse: boolean;
  setCollapsed: (isCollapse: boolean) => any;
}) => {
  return (
    <div
      className="ml-3 max-w-min"
      onClick={() => setCollapsed(!isCollapse)}
      style={{
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      {isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  );
};
const { Option } = Select;
const CompanySelect = ({
  companies,
  company,
  setCompany,
}: {
  companies: [API.Company];
  company: any;
  setCompany: any;
}) => {
  return companies && companies.length > 0 ? (
    <div className="ml-4 w-44">
      <Select
        className="w-full"
        defaultValue={company}
        onChange={setCompany}
        dropdownMatchSelectWidth
      >
        {companies.map((cmp) => (
          <Option key={cmp.id} value={cmp.id}>
            {cmp.name}
          </Option>
        ))}
      </Select>
    </div>
  ) : null;
};

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const isCollapse = !!initialState?.collapse;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const setCollapsed = () => {
    setInitialState({ ...initialState, collapse: !isCollapse });
  };

  const currentCompany = initialState?.currentCompany || null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const setCurrentCompany = (id: number) => {
    localStorage.setItem(
      `${initialState?.currentUser.id}.currentCompany`,
      id.toString()
    );
    setInitialState({
      ...initialState,
      currentCompany: id,
    });
  };
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    onCollapse: setCollapsed,
    collapsed: isCollapse,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;

      if (
        !initialState?.currentUser &&
        !unauthorizedPath.includes(location.pathname)
      ) {
        history.push("/auth/login");
      }
    },
    links: isDev
      ? [
          <>
            <LinkOutlined />
            <span
              onClick={() => {
                window.open("/api/v1/docs");
              }}
            >
              Swagger API Documentation
            </span>
          </>,
          <>
            <BookOutlined />
            <span
              onClick={() => {
                window.open("/~docs");
              }}
            >
              Documentations
            </span>
          </>,
        ]
      : [],

    headerContentRender: () => (
      <div className="flex items-center">
        <CollapseButton isCollapse={isCollapse} setCollapsed={setCollapsed} />
        <CompanySelect
          companies={initialState?.currentUser?.companies}
          company={currentCompany}
          setCompany={setCurrentCompany}
        />
      </div>
    ),

    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: "Success",
  201: "Created",
  202: "202",
  204: "Delete successfully",
  400: "Bad Request",
  401: "Unauthorized Connect.",
  403: "Forbidden",
  404: "Not found",
  405: "Method Not Allowed",
  406: "Not accepted",
  410: "Gone",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "Internal Server Error",
  502: "Port Error",
  503: "Service Unavailable",
  504: "Request Timeout",
};

const errorHandler = (error: ResponseError) => {
  const { response } = error;

  if (response && response.status) {
    const errorText =
      error?.data.message ||
      codeMessage[response.status] ||
      response.statusText;
    const { status } = response;
    // if (response.status === 401) history.replace('/auth/login')
    notification.error({
      message: `Error ${status}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: "Cannot connect to the services.",
      message: "Please check your connection.",
    });
  }
  throw error;
};

const withAccessToken: RequestInterceptor = (
  url: string,
  options: RequestOptionsInit
) => {
  const token = localStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return {
    url,
    options: { ...options, headers },
  };
};

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [withAccessToken],
};
