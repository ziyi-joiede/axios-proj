import { AxiosReuestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
function axios(config: AxiosReuestConfig):void {
  processConfig(config)
  // TODO
  xhr(config)
}

/**
 * @description 处理 config
 * @param { AxiosReuestConfig } config 请求的配置参数
 */
function processConfig(config: AxiosReuestConfig):void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

/**
 * @description 转换 url
 * @param { AxiosReuestConfig } config 请求的配置参数
 * @returns
 */
function transformURL(config: AxiosReuestConfig):string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosReuestConfig):any {
  return transformRequest(config.data)
}


function transformHeaders(config: AxiosReuestConfig):any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}


export default axios
