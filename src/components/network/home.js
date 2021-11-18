import {request} from "./request.js"

export function getHomeMultidata() {
  // 对首页所有的url进行管理
  return request({
    // 返回一个promise
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
