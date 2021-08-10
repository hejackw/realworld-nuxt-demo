export default function ({ store, redirect }) {
  // 如果登录了就跳转首页
  if (store.state.user) {
    return redirect('/')
  }
}
