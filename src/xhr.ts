
import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise
} from './types';

import { parseHeaders } from './helpers/headers';

export default function xhr(config: AxiosRequestConfig): AxiosPromise{
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType
    } = config

    const request = new XMLHttpRequest()

    if(responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function hendleLoad() {
      if(request.readyState !== 4) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      resolve(response)
    }

    // 把 headers 设置在 http 请求的头部
    Object.keys(headers).forEach(name => {
      if(data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      }else {
        // XMLHttpRequest 实例对象设置请求头
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })

}
