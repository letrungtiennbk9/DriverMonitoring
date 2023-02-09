// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { compact, isNumber } from 'lodash'
export async function getVehicles(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
  keyword?: string;
  company?: number;
}, options?: { [key: string]: any }) {

  // let mappedParams = {};
  // params && Object.entries(params).forEach(([key, val]) => {
  //   if (key === "current")
  //     mappedParams["page"] = Number(val) - 1
  //   else if (key === "pageSize")
  //     mappedParams["rowsPerPage"] = val
  //   else if (key === "company")
  //     mappedParams["company"] = val
  //   else mappedParams[key] = val
  // })

  // if (mappedParams["keyword"] === undefined) mappedParams["keyword"] = ""

  const res = await request<any>(`/api/v1/vehicle/${isNumber(params.company) ? `company/${params.company}` : 'all'}`, {
    method: 'GET',
    ...(options || {}),
  });

  return ({ data: res })
}


export async function addVehicle(values: FormData, options?: { [key: string]: any }) {
  return request<any>('/api/v1/vehicle', {
    method: 'POST',
    headers: {
      'Content-Type': ": multipart/formdata",
    },
    data: values,
    ...(options || {}),
  });
}