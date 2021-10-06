import { normalize } from 'path';
import { isPlainObject } from './util';


function normalizeHeaderName(headers: any, normalizeName: string): void {
  if(!headers) {
    return
  }
  Object.keys(headers).forEach(key => {
    if(key !== normalizeName && key.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[key]
      delete headers[key]
    }
  })
}

export function processHeaders(headers: any, data: any):any {

  normalizeHeaderName(headers, 'Content-Type')

  if(isPlainObject(data)) {
    if(headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
