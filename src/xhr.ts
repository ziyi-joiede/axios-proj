
import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise
} from './types';

import { parseHeaders } from './helpers/headers';
import { createError } from './helpers/error'
import { ECONNABORTED } from 'constants';


export default function xhr(config: AxiosRequestConfig): AxiosPromise{
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout
    } = config

    const request = new XMLHttpRequest()

    if(responseType) {
      request.responseType = responseType
    }

    // 添加请求的超时
    if(timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function hendleLoad() {
      if(request.readyState !== 4) {
        return
      }

      // 超时,发生网络错误时
      if(request.status === 0) {
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

      handleResponse(response)
    }

    // 处理网络异常
    request.onerror = function healdeError() {
      reject(createError('Network Error', config, null, request))
    }

    // 处理超时
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
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

    function handleResponse(response: AxiosResponse):void {
      if(response.status >= 200 && response.status < 300) {
        resolve(response)
      }else {
        reject(createError(`Response failed with status code ${response.status}`, config, null, request, response))
      }
    }
  })

}
