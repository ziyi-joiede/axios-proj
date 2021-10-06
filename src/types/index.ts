export type Method = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'POST'
  | 'patch' | 'PATCH'

export interface AxiosReuestConfig{
  url: string,
  method?: Method
  data?: any
  params?: any
  headers?: any
}
