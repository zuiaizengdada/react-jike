import type { FormValue } from '@/pages/Publish';
import { request } from '@/utils';

export function getChannelAPI() {
  return request({
    url: '/channels',
    method: 'GET'
  });
}

export function createArticleAPI(data: FormValue) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  });
}

export function getArticleListAPI(params: any) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  });
}
