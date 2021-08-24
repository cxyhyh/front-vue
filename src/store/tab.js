export default {
    state: {
      menu: [],
      currentMenu: null
    },
    mutations: {
      selectMenu(state, val) {
        // 判断当前菜单name是否为home，如果是则将currentMenu属性设置为null，如果不是则将val赋值给currentMenu属性
        val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
      }
    },
    actions: {},
    modules: {}
  }
  
  