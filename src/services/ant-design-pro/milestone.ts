import request from "umi-request";

export async function addMileStone(
  values: any,
  options?: { [key: string]: any }
) {
  return await request<any>("/api/v1/milestone", {
    method: "POST",
    headers: {
      "Content-Type": ": application/json",
    },
    data: values,
    ...(options || {}),
  });
}
