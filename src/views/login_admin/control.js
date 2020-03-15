import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    var checkName = (rule, value, callback) => {
      let that = this;
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        username: "",
        pass: ""
      },
      rules: {
        username: [
          {
            validator: checkName,
            trigger: "blur"
          }
        ],
        pass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    /**
     * 登录
     * @returns {Promise<void>}
     */
    async adminLogin() {
      if (this.userInfo.username === '') {
        this.$message({
          type: "warning",
          message: "用户名未填写"
        });
        return
      }
      if (this.userInfo.pass === '') {
        this.$message({
          type: "warning",
          message: "密码未填写"
        });
        return
      }
      let requestData = {
        userEmail: this.userInfo.username,
        passWord: this.userInfo.pass
      };
      let newUserInfo = Object.assign({}, requestData);
      let res = await this.login(newUserInfo);

      if (res.code === 200) {
        this.$router.replace({
          path: "/homepage"
        });
      } else {
        this.$alert('', `${res.message}`, {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      }

      // this.setInfo(newUserInfo)
      // this.actionsSetUserInfo(newUserInfo)
    },

    ...mapActions(["login"]),

    // ...mapMutations({
    //   setInfo: 'SET_USERINFO'
    // }),

    // ...mapActions([
    //   'actionsSetUserInfo'
    // ])

    /**
     * 注册
     */
    async signIn() {
      this.$router.push({
        path: "/register"
      });
    }
  }
};
