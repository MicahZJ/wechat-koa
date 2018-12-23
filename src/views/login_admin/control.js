import { axiosPost } from '../../api/api'
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
      let Api = '/api/login'
      let requestData = {
        userEmail: this.userInfo.username,
        passWord: this.userInfo.pass
      };
      console.log('登录数据', requestData)
      let res = await axiosPost(Api, requestData)
      if (res.code === 200) {
        this.$router.push({
          path: "/homepage"
        });
      } else {
        alert(`${res.message}`);
      }
    }
  }
};
