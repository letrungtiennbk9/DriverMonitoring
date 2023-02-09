// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function updatePassword(body: API.UpdatePassword, options?: { [key: string]: any }) {
  return request<any>('/api/v1/user/password', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getStreamingLink(driverId: number, time: Date) {
  return request<any>(`/api/v1/user/driver/${driverId}/streaming-link`, {
    method: 'GET',
    params: {
      time: (new Date(time)).toISOString()
    }
  })
}

export async function removeStreamingLink(driverId: number, time: Date) {
  return request<any>(`/api/v1/user/driver/${driverId}/streaming-link`, {
    method: 'DELETE',
    params: {
      time: (new Date()).toISOString()
    }
  })
}