// 员工管理页
import axios from '@/utils/request.js'

// 获取用户列表数据  post -- data && get -- params
export const getUser = (data) => {
  return axios.request({
    url: '/user-manage/list',
    method: 'GET',
    // get传参必须是 params参数
    params: data
  })
}

// excel 批量插入
export const addUserByExcel = (data) => {
  return axios.request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

// 获取所有数据
export const getAllUser = () => {
  return axios.request({
    url: '/user-manage/all-list',
    method: 'GET'
  })
}

// 删除数据
export const deleteUserById = (id) => {
  return axios.request({
    url: `/user-manage/detele/${id}`,
    method: 'GET'
  })
}
