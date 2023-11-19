import { LoginForm } from '@/pages/Login';
import { request } from '@/utils';

function loginAPI(formData: LoginForm) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: formData
  });
}

function getProfileAPI() {
  return request({
    url: '/user/profile',
    method: 'GET'
  });
}

export { loginAPI, getProfileAPI };
