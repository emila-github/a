import { axios } from '@/utils/request'

//post
export function postAction(url, parameter, config = {}) {
  return axios(
    Object.assign(
      {
        url: url,
        method: 'post',
        data: parameter,
      },
      config,
    ),
  )
}

//post method= {post | put}
export function httpAction(url, parameter, method, config = {}) {
  return axios(
    {
      url: url,
      method: method,
      data: parameter,
    },
    config,
  )
}

//put
export function putAction(url, parameter, config = {}) {
  return axios(
    Object.assign(
      {
        url: url,
        method: 'put',
        data: parameter,
      },
      config,
    ),
  )
}

//get
export function getAction(url, parameter, config = {}) {
  return axios(
    Object.assign(
      {
        url: url,
        method: 'get',
        params: parameter,
      },
      config,
    ),
  )
}

//deleteAction
export function deleteAction(url, parameter, config = {}) {
  return axios(
    Object.assign(
      {
        url: url,
        method: 'delete',
        params: parameter,
      },
      config,
    ),
  )
}
