import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse
} from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import {
  transformRequest,
  transformResponse
} from './helpers/data'
import { processHeaders } from './helpers/headers'


function axios(config: AxiosRequestConfig):AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

/**
 * @description 处理 config
 * @param { AxiosRequestConfig } config 请求的配置参数
 */
function processConfig(config: AxiosRequestConfig):void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

/**
 * @description 转换 url
 * @param { AxiosRequestConfig } config 请求的配置参数
 * @returns
 */
function transformURL(config: AxiosRequestConfig):string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig):any {
  return transformRequest(config.data)
}


function transformHeaders(config: AxiosRequestConfig):any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse):AxiosResponse{
  res.data = transformResponse(res.data)
  return res
}

export default axios
