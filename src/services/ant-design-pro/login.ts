// @ts-ignore
/* eslint-disable */
import API from "@/api";
import { AxiosRequestConfig } from "axios";
import { request } from 'umi';



/** 登录接口 POST /api/login/account */
export async function logi2n(body: API.LoginParams) {
  return API.post('user/login', body as AxiosRequestConfig)
}


export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/v1/user/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}