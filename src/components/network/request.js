import axios from 'axios'

export function request(config) {
  // 创建实例
  const instance = new axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  });

  // 请求拦截器
  instance.interceptors.request.use(config => {
    return config;
  }, err => {

  })

  // 相应拦截器
  instance.interceptors.response.use(res => {
    // 拦截后需要将拦截下来处理成的结果返回
    return res.data
  }, err => {
    console.log(err)
  })

  // 发送真正的网络请求
  return instance(config)
}
