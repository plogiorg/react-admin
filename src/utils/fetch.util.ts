import Config from "../config";
import { LOCALSTORAGE_KEYS } from "../constants";

type FetchUtilOptions = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  queryParams?: Record<string, any>;
  token?: boolean;
  media?: boolean;
  raw?: boolean;
};

export function fetchUtil(options: FetchUtilOptions): Promise<any> {
  const { url, method = "GET", body, queryParams, token, media, raw } = options;

  let apiUrl = media ? url : `${Config.API_URL}${url}`;

  const headers: Record<string, string> = {};
  if (!media) {
    headers["Content-Type"] = "application/json";
    headers["x-user-type"] = "admin";
    if (token) {
      const sessionToken = localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN);
      headers.Authorization = `Bearer ${sessionToken}`;
    }
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
    body: media ? body : JSON.stringify(body),
  };

  if (queryParams) {
    const queryString = new URLSearchParams(queryParams).toString();
    apiUrl += `?${queryString}`;
  }

  return new Promise((resolve, reject) => {
    fetch(apiUrl, fetchOptions)
      .then(async (res) => {
        if (res.status === 401) {
          localStorage.removeItem(LOCALSTORAGE_KEYS.TOKEN);
          reject(false);
          return;
        }

        if (media) {
          resolve(true);
          return;
        }

        if (raw) {
          resolve(res);
          return;
        }

        try {
          const json = await res.json();

          if (res.status >= 400) {
            reject(json);
          } else {
            resolve(json);
          }
        } catch (err) {
          if (res.status >= 400) {
            reject({ message: "Unknown error" });
          } else {
            resolve(null);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

export function generateAPIUrl(url: string, queryParams?: Record<string, any>) {
  let apiUrl = `${Config.API_URL}${url}`;

  if (queryParams) {
    const queryString = new URLSearchParams(queryParams).toString();
    apiUrl += `?${queryString}`;
  }

  return apiUrl;
}

export function getHostUrl() {
  return `${window.location.protocol}//${window.location.host}`;
}
