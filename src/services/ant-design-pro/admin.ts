// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function addAdmin(body: API.CreateAdminField, options?: { [key: string]: any }) {
    return request<any>('/api/v1/user/admin', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
