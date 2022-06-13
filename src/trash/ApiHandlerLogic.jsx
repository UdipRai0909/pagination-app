export const ApiHandlerLogic = () => {
  const getData = async (url, options = {}) => {
    const defaultMethod = "GET";
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || defaultMethod;
    options.headers = options.headers
      ? { ...defaultHeaders, ...options.headers }
      : defaultHeaders;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    setTimeout(() => {
      controller.abort();
    }, 3000);

    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (err) {
      return err;
    }
  };

  const get = (url, options = {}) => getData(url, options);

  const post = (url, options) => {
    options.method = "POST";
    return getData(url, options);
  };

  const put = (url, options) => {
    options.method = "PUT";
    return getData(url, options);
  };

  const del = (url, options) => {
    options.method = "DELETE";
    return getData(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
