// @ts-ignore
/* eslint-disable */
import { request } from "umi";

export async function addClient(
  data: FormData,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/user/client", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
    ...(options || {}),
  });
}

export async function addDriver(value: any, options?: { [key: string]: any }) {
  return request<any>("/api/v1/user/driver", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: value,
    ...(options || {}),
  });
}

export async function clients(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    keyword?: string;
    sortBy?: string;
    sortType?: string;
    roles?: string;
    company?: string;
  },
  options?: { [key: string]: any }
): Promise<any> {
  let mappedParams: any = {};
  Object.entries(params).forEach(([key, val]) => {
    if (key === "current") mappedParams["page"] = Number(val) - 1;
    else if (key === "pageSize") mappedParams["rowsPerPage"] = val;
    else mappedParams[key] = val;
  });

  if (!mappedParams["sortType"]) mappedParams["sortType"] = "ASC";
  if (!mappedParams["sortBy"]) mappedParams["sortBy"] = "id";

  if (mappedParams["roles"] === "") {
    delete mappedParams.roles;
  }

  const clients = await request<API.ClientItem>("/api/v1/user/all", {
    method: "GET",
    params: {
      ...mappedParams,
    },
    ...(options || {}),
  });

  return { data: clients };
}
