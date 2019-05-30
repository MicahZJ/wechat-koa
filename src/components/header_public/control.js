import { mapMutations, mapActions, mapGetters } from "vuex";

export default{
  data() {
    return {
      activeIndex: '1',
      info: {}
    }
  },
  mounted() {
    this.getVuexState()
  },
  computed: {
    ...mapGetters(["userInfo"]),  
  },
  methods: {
    ...mapActions(['loginOut']),

    getVuexState() {
      this.info ? this.userInfo: "" 
    },

    /**
     * 选择访问页面
     * @param {*} key 
     * @param {*} keyPath 
     */
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    handleCommand(command) {
      console.log(typeof command)
      // this.$message('click on item ' + command);
      switch (Number(command)) {
        case 1: // 编辑
          this.toEditInfoPage()
          break;
        case 2: // 登出
          this.LoginOut()
          break;
        default:
          break;
      }
    },

    /**
     * 登出
     */
    LoginOut() {
      this.$confirm('登出将失去异界主角光环, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.$message({
          type: 'success',
          message: '你终于还是成为了路人甲!'
        });
        if (await this.loginOut())
          this.$router.replace({
            path: '/login'
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '阔以，你现在还是主角!'
        });          
      });
    },

    /**
     * 跳转编辑页
     */
    toEditInfoPage() {
      this.$alert('暂时还没写', '无题', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
    }
  }
}