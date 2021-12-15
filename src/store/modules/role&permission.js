// 角色与权限数据
// 角色列表请求
import { getAllRole, getPermissionsByRoleId } from '@/api/role.js'
// 请求所有的权限列表
import { getAllPermissions } from '@/api/permission.js'
// 引入封装好的本地存储
import { getItem, setItem } from '@/utils/storage.js'
// 引入角色--权限变量
import { ROLE, PERMISSION, PERMISSION_ } from '@/common/common.js'
const state = {
  /**
   * role:[{
   *  id
   *  title
   *  describe
   *  permissions:[{id:1,title:'用户列表'}]
   * }]
   */
  roles: getItem(ROLE) || [],
  permissions: getItem(PERMISSION) || [],
  permissions_: getItem(PERMISSION_) || []
}
// 将权限的id转换成 title --- [{id:1,title:'用户列表'}]
const permissionIdToTitle = (idArr, perArr) => {
  const res = []
  idArr.forEach((id) => {
    perArr.forEach((per) => {
      if (per.id === id) {
        res.push({ id: per.id, title: per.permissionName })
      }
      if (per.children && per.children.length > 0) {
        per.children.forEach((cPer) => {
          if (cPer.id === id) {
            res.push({ id: cPer.id, title: cPer.permissionName })
          }
        })
      }
    })
  })
  return res
}

const mutations = {
  // 初始化角色
  initRoles: (state, roles) => {
    state.roles = roles
    // 将所有角色进行本地储存
    setItem(ROLE, state.roles)
  },
  // 初始化权限
  initPermissions: (state, permissions) => {
    state.permissions = permissions
    // 本地存储初始化权限
    setItem(PERMISSION, state.permissions)

    const temArr = []
    state.permissions.forEach((item) => {
      temArr.push({ id: item.id, title: item.permissionName })
      if (item.children && item.children.length > 0) {
        item.children.forEach((im) => {
          temArr.push({ id: im.id, title: im.permissionName })
        })
      }
    })
    state.permissions_ = temArr
    // 本地存储展开后权限（父子同级）
    setItem(PERMISSION_, temArr)
  },
  // 更新角色，让每个角色数据也包含他的权限数据
  updatePermissionToRole: (state, { roleId, permissionArray }) => {
    state.roles.forEach((role) => {
      if (role.id === roleId) {
        role.permissions = permissionIdToTitle(
          permissionArray,
          state.permissions
        ) // [1,1-1,2]
      }
    })
    // 将所有角色加权限再次进行本地储存 （覆盖了初始化角色数据--因为上边的数据没有添加角色）
    setItem(ROLE, state.roles)
  }
}

const actions = {
  // 初始化所有角色 （如果本地储存有 就不发送请求）
  InitRoles: async ({ commit, state }) => {
    let roleList = state.roles
    if (Array.isArray(roleList) && roleList.length <= 0) {
      console.log('初始化角色')
      roleList = await getAllRole()
      commit('initRoles', roleList)
      // // 遍历每一个角色 分别发送 获取对应权限的请求
      // roleList.forEach(async (role) => {
      //   // 每个角色对应的权限 合并到一起 更新到 vuex
      //   const res = await getPermissionsByRoleId(role.id)
      //   commit('updatePermissionToRole', {
      //     roleId: role.id,
      //     permissionArray: res
      //   })
      // })
    }
    // 遍历每一个角色 分别发送 获取对应权限的请求
    roleList.forEach(async (role) => {
      // 每个角色对应的权限 合并到一起 更新到 vuex
      const res = await getPermissionsByRoleId(role.id)
      commit('updatePermissionToRole', {
        roleId: role.id,
        permissionArray: res
      })
    })
  },
  // 初始化所有权限（如果本地储存有 就不发送请求）
  InitPermissions: async ({ commit, state }) => {
    const perList = state.permissions
    if (Array.isArray(perList) && perList.length <= 0) {
      console.log('初始化权限')
      const permissionsList = await getAllPermissions()
      commit('initPermissions', permissionsList)
    }
  },
  // 清除本地数据
  clearRoleAndPermission: ({ commit }) => {
    // 清空本地的 角色数据
    commit('initRoles', [])
    // 清空本地的权限视频
    commit('initPermissions', [])
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
