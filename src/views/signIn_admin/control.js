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
        pass: "",
        passVerification: ""
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async adminRegister() {
      if (this.userInfo.pass !== this.userInfo.passVerification) {
        this.$message({
          message: "密码验证错误，请重新输入",
          type: "warning"
        });
        return;
      }
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
      let api = "/api/registered";
      let requestData = {
        userEmail: this.userInfo.username,
        passWord: this.userInfo.pass
      };

      let res = await this.$Http.axiosPost(api, requestData);
      if (res.code === 200) {
        this.$router.push({
          path: "/login"
        });
      }
    }
  }
};
