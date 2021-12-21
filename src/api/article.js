// 文章页
import axios from '@/utils/request.js'

// 获取文章列表
export const getArticleList = (data) => {
  return axios.request({
    url: '/article/list',
    method: 'GET',
    params: data
  })
}

// 删除文章
export const removeArticleById = (id) => {
  return axios.request({
    url: '/article/delete/' + id,
    method: 'GET'
  })
}

// 查看文章详情
export const getArticleDetails = (id) => {
  return axios.request({
    url: '/article/' + id,
    method: 'GET'
  })
}

// 修改文章排名
export const updateArticleRanking = (data) => {
  return axios.request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}

// 创建文章
export const createArticle = (data) => {
  return axios.request({
    url: '/article/create',
    method: 'POST',
    data
  })
}
// 编辑文章详情
export const editArticle = (data) => {
  return axios.request({
    url: '/article/edit',
    method: 'POST',
    data
  })
}
