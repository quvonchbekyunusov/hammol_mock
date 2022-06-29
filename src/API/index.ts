import axios from "axios";

export const url = "http://localhost:3001/api/";

const client = axios.create({ baseURL: url });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Accept = "multipart/form-data";

  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    return Promise.reject(error);
  };
  return client(options).then(onSuccess).catch(onError);
};
