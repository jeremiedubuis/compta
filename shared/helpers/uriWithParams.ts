export const uriWithParams = (
    uri: string,
    params: { [key: string]: string },
    queryParams?: { [key: string]: string }
) =>
    uri
        .replace(/\/\?([a-zA-Z]+)/g, (full, g1) => (params[g1] ? '/' + params[g1] : ''))
        .replace(/:([a-zA-Z]+)/g, (full, g1) => params[g1]) +
    (queryParams
        ? '?' +
          Object.keys(queryParams)
              .map((key) => `${key}=${queryParams[key]}`)
              .join('&')
        : '');
