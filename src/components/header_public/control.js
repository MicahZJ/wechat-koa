import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      activeIndex: "1",
      info: {},
      userInfo: {}
    };
  },
  mounted() {
    // this.getVuexState();
    this.getUserInfo();
  },
  computed: {
    // ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["loginOut"]),

    // getVuexState() {
    //   this.info ? this.userInfo : "";
    // },

    /**
     * 获取用户信息
     */
    async getUserInfo() {
      let api = "/api/login/info";
      let requestData = {};

      let res = await this.$Http.axiosGet(api, requestData);
      if (res.code === 200) {
        this.userInfo = res.data.userInfo;
      }
    },

    /**
     * 选择访问页面
     * @param {*} key
     * @param {*} keyPath
     */
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    /**
     * 用户操作
     * @param {*} command 1为编辑，2为登出
     */
    handleCommand(command) {
      console.log(typeof command);
      // this.$message('click on item ' + command);
      switch (Number(command)) {
        case 1: // 编辑
          this.toEditInfoPage();
          break;
        case 2: // 登出
          this.LoginOut();
          break;
      }
    },

    /**
     * 登出
     */
    LoginOut() {
      this.$confirm("即将退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "成功退出!"
          });
          if (await this.loginOut())
            this.$router.replace({
              path: "/login"
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出!"
          });
        });
    },

    /**
     * 跳转编辑页
     */
    toEditInfoPage() {
      this.$router.push({
        path: "/edit"
      });
    }
  }
};
