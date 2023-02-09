// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function getCompanies(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
  keyword?: string;

}, options?: { [key: string]: any }) {

  let mappedParams = {};
  params && Object.entries(params).forEach(([key, val]) => {
    if (key === "current")
      mappedParams["page"] = Number(val) - 1
    else if (key === "pageSize")
      mappedParams["rowsPerPage"] = val
    else mappedParams[key] = val
  })

  if (mappedParams["keyword"] === undefined) mappedParams["keyword"] = ""

  const res = await request<any>('/api/v1/company/all', {
    method: 'GET',
    params: { ...mappedParams },
    ...(options || {}),
  });

  return ({ data: res })
}


export async function addCompany(values: { name: string }, options?: { [key: string]: any }) {
  return request<any>('/api/v1/company', {
    method: 'POST',
    data: values,
    ...(options || {}),
  });
}