import publicHeader from "components/header_public";

export default {
  data() {
    let checkContent = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        unit_name: "",
        telephone: "",
        registered_time: "",
        contract_time: "",
        remarks: ""
      },
      rules: {
        unit_name: [
          {
            validator: checkContent,
            trigger: "blur"
          }
        ],
        telephone: [
          {
            validator: checkContent,
            trigger: "blur"
          }
        ],
        registered_time: [
          {
            validator: checkContent,
            trigger: "blur"
          }
        ],
        contract_time: [
          {
            validator: checkContent,
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    registered_time: {
      handler(newV, old) {
        console.log("注册", newV);
      },
      deep: true
    },

    contract_time: {
      handler(newV, old) {
        console.log("合同", newV);
      },
      deep: true
    }
  },
  computed: {},
  components: {
    publicHeader
  },
  methods: {
    /**
     * 时间日期格式化
     * @param format
     * @returns {*}
     */
    formatDate(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let D = date.getDate();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      M = M.toString().length < 2 ? "0" + M : M;
      D = D.toString().length < 2 ? "0" + D : D;
      h = h.toString().length < 2 ? "0" + h : h;
      m = m.toString().length < 2 ? "0" + m : m;
      s = s.toString().length < 2 ? "0" + s : s;
      return Y + "-" + M + "-" + D;
    },
    /**
     * 保存新数据
     */
    async saveNewData() {
      if (this.ruleForm.unit_name === '') {
        this.$message({
          type: "warning",
          message: "单位名称未填写"
        });
        return
      }
      if (this.ruleForm.telephone === '') {
        this.$message({
          type: "warning",
          message: "联系电话未填写"
        });
        return
      }
      if (this.ruleForm.registered_time === '') {
        this.$message({
          type: "warning",
          message: "注册日期未填写"
        });
        return
      }
      if (this.ruleForm.contract_time === '') {
        this.$message({
          type: "warning",
          message: "合同日期未填写"
        });
        return
      }
      let Api = "/api/activity/addNew";
      let requestData = {
        contract_time: this.ruleForm.contract_time,
        telephone: this.ruleForm.telephone,
        registered_time: this.formatDate(this.ruleForm.registered_time),
        unit_name: this.ruleForm.unit_name,
        contract_time: this.formatDate(this.ruleForm.contract_time),
        remarks: this.ruleForm.remarks,
        status: 1,
        alarm_level: 3
      };

      const res = await this.$Http.axiosPost(Api, requestData);
      if (res.code === 200) {
        this.$alert("新增一条记录", "修改结果", {
          confirmButtonText: "确认",
          callback: action => {
            this.$router.replace({
              path: "/homepage"
            });
          }
        });
      }
    },

    backHome() {
      this.$confirm("当前数据暂未保存, 是否继续返回?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.replace({
            path: "/homepage"
          });
        })
        .catch(() => {
          // this.$message({
          // 	type: 'info',
          // 	message: '已取消删除'
          // });
        });
    }
  },
  beforeCreate() {
    /*
     * 实例初始化后，创建完成之前被调用
     */
    console.log("1. beforeCreate");
  },
  created() {
    /*
     * 实例创建完成后被立即调用，这个时候还没有开始挂载 不能访问
     */
    console.log("2. created");
  },
  beforeMount() {
    /*
     * 挂载开始之前调用，即将开始挂载
     */
    console.log("3. beforeMount");
  },
  mounted() {
    /*
     * 实例挂载之后调用，但是并不是所有子组件也都一起挂载完成
     */
    console.log("5. mounted");
  },
  beforeUpdate() {
    /*
     * 数据更新完成前调用，发生在虚拟DOM重新渲染和打补丁前，在这里进一步的更改状态，不会触发重新渲染
     */
    console.log("6. beforeUpdate");
  },
  updated() {
    /*
     * 更改数据重新渲染虚拟DOM后调用
     */
    console.log("8. updated");
  },
  beforeDestroy() {
    /*
     * 实例销毁之前调用，在这一步，实例仍然可用
     */
    console.log("9. beforeDestroy");
  },
  destroyed() {
    console.log("10. destroyed");
  }
};
