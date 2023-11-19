// axios封装
import axios, { AxiosInstance } from 'axios';

/**
 * 1. 根域名配置
 * 2. 超时时间设置
 * 3. 请求拦截器 / 响应拦截器
 */
const baseURL = 'http://geek.itheima.net/v1_0';
const timeout = 5000;

const request: AxiosInstance = axios.create({
  baseURL,
  timeout
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export { request };
