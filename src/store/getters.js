const getters = {
  userinfo: (state) => state.user.userinfo,
  token: (state) => state.user.token,
  news: (state) => state.user.news,
  menuList: (state) => state.permission.menuList,
  playInfo: (state) => state.playList.playInfo,
}
export default getters