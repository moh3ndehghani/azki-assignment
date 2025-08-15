export async function useCustomFetch<T>(url: string, options = {}) {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const isClientNavigation = process.client && nuxtApp.isHydrating === false;

  const defaults = {
    baseURL: config.public.baseApi,
    key: url,
    headers: {
      Accept: "application/json",
      ...options?.headers,
    },
    onRequest({ request, options }) {
      // Your request handling
    },
    onRequestError({ request, options, error }) {
      console.error("Request error =========", error);
    },
    onResponse({ request, response, options }) {
      return response._data.data;
    },
    onResponseError({ request, response, options }) {
      console.error("error ====>", response);
    },
    ...options,
  };

  if (isClientNavigation || (process.client && options.server === false)) {
    return $fetch(url, defaults).then((response) => {
      return { data: response };
    });
  }

  const { data, status, error } = await useFetch(url, defaults);

  return Promise.resolve({
    data: unref(data),
    status: unref(status),
    error: unref(error),
  });
}
