import { responseBody, responseError } from "@/helpers/axiosResponse";
import type { ILogin } from "@/models/auth";
import axios, { AxiosError, type AxiosResponse } from "axios";



/**
 *
 * @param params
 * @returns
 */
const loginUser = (params: ILogin): Promise<AxiosError | AxiosResponse> =>
  new Promise((resolve, reject) => {
    axios
      .post(`login`, params)
      .then((response) => {
        resolve(responseBody(response));
      })
      .catch((error) => {
        reject(responseError(error));
      });
  });

export { loginUser };
