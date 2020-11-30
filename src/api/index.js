/* global SERVER_URI */
import axios from 'axios'
import router from '../router'
import { Toast } from 'cube-ui'
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  config.baseURL = process.env.NODE_ENV === 'production' ? SERVER_URI : ''
  return config
})

axios.interceptors.response.use(res => {
  if (!res.data.success) {
    Toast.$create({
      txt: res.data.message,
      mask: true,
      type: 'error'
    }).show()
    return Promise.reject(res.data.message)
  }
  return res
}, () => {
  router.push('/login')
})
export default {
  login(data) {
    return axios({
      method: 'post',
      url: '/api/TempUser/TempUserMemberLogin',
      data
    })
  },
  logout() {
    return axios({
      methods: 'get',
      url: '/api/TempUser/LogOut'
    })
  },
  ValidateKeyAllow(params) {
    return axios.get('/api/TempUser/ValidateKeyAllow', {
      params
    })
  },
  AndroidTUGetTradeSummary(params) {  // 订单数据
    return axios.get('/api/TempUser/AndroidTUGetTradeSummary', {
      params
    })
  },
  AndroidTUGetTradeItem(params) { // 订单详情
    return axios.get('/api/TempUser/AndroidTUGetTradeItem', {
      params
    })
  }
}
