import request from 'umi-request';
import { message } from 'antd';

request.interceptors.response.use(async response => {
  try {
    const { code, description } = await response.clone().json();
    if (code !== 200) {
      message.error(description);
      return Promise.reject();
    }
  } catch (e) {
    console.log(e);
  }
  return response;
});
