import { isPlainObject } from './util';


function normalizeHeaderName(headers: any, normalizedName: string): void {
  if(!headers) {
    return
  }
  Object.keys(headers).forEach(key => {
    if(key !== normalizedName && key.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[key]
      delete headers[key]
    }
  })
}

/**
 * @description 处理请求的 headers
 * @param { object } headers 请求的 headers 对象
 * @param { any } data 请求的 data 对象
 * @returns
 */
export function processHeaders(headers: any, data: any): any {

  normalizeHeaderName(headers, 'Content-Type')

  if(isPlainObject(data)) {
    if(headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

/**
 * @description 处理响应的 headers
 * @param { string } headers 响应的 headers
 * @returns
 */
export function parseHeaders(headers: string):any {
  const parsed = Object.create(null)

  if(!headers){
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if(!key){
      return
    }

    if(val) {
      val = val.trim()
    }

    parsed[key] = val
  })

  return parsed
}
