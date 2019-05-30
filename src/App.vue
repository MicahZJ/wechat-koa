<template>
  <div id="app">
    <!--<div id="nav">-->
       <!--<router-link to="/">Login</router-link> | -->
      <!--<router-link to="/about">About</router-link>-->
      <!--<router-link to="/Login">Login</router-link>-->
    <!--</div>-->
    <router-view />
  </div>
</template>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  display flex
  justify-content flex-start
  align-items center
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
<script>
import { mapMutations, mapActions } from "vuex";
export default {
  data () {
    return {

    }
  },
  created() {
    this.axiosIntercept()
  },
  methods: {
    /**
     * 请求拦截
     */
    axiosIntercept() {
      let that = this
      this.$Axios.interceptors.response.use(
      async (response) => {
        let res = response.data
        console.log('res', res)
        if (res.code === 50014){
          let flag = await that.loginOut()
          localStorage.removeItem('token')
          if (flag) {
            this.$alert('登录失效', '小提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.replace({
                  path: "/login"
                })  
              }
            })
          }
        }
        return response
      }, 
      (err) => {
        console.log('err报错',err)
        throw err
      }
    )
    },
    ...mapActions(["loginOut"]),
  }
}
</script>

