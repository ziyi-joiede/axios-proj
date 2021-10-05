import { AxiosReuestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'

function axios(config: AxiosReuestConfig):void {
  processConfig(config)
  // TODO
  xhr(config)
}

function processConfig(config: AxiosReuestConfig):void {
  config.url = transformURL(config)
}

function transformURL(config: AxiosReuestConfig):string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
