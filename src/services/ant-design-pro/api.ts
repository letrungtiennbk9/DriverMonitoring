// @ts-ignore
/* eslint-disable */
import API from '@/api';
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser2() {
  return API.get('user/me');
}

export async function currentUser() {
  return request<API.LoginResult>('/api/v1/user/me', {
    method: 'GET',
  });
}