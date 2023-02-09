import request from "umi-request";

export async function addRoute(values: any, options?: { [key: string]: any }) {
  return await request<any>("/api/v1/route", {
    method: "POST",
    headers: {
      "Content-Type": ": application/json",
    },
    data: values,
    ...(options || {}),
  });
}

export async function getRoutes(values: any, options?: { [key: string]: any }) {
  const data = await request<any>("/api/v1/route/all", {
    method: "GET",
    headers: {
      "Content-Type": ": application/json",
    },
    params: {
      company: values.company,
    },
    ...(options || {}),
  });

  return { data };
}

export async function getRoute(values: any, options?: { [key: string]: any }) {
  const data = await request<any>(`/api/v1/route/${values.id}`, {
    method: "GET",
    headers: {
      "Content-Type": ": application/json",
    },
    params: {
      company: values.company,
    },
    ...(options || {}),
  });

  return { data };
}


export async function deleteRoute(values: any, options?: { [key: string]: any }) {
  const data = await request<any>(`/api/v1/route/${values.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": ": application/json",
    },
    params: {
      company: values.company,
    },
    ...(options || {}),
  });

  return { data };
}
