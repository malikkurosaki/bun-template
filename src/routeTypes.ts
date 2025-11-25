
export type AppRoute = "/login" | "/" | "/dashboard" | "/dashboard/apikey/apikey" | "/dashboard/dashboard";

export function route(path: AppRoute, params?: Record<string,string|number>) {
  if (!params) return path;
  let final = path;
  for (const k of Object.keys(params)) {
    final = final.replace(":" + k, params[k] + "") as AppRoute;
  }
  return final;
}
