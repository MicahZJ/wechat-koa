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
      id: "", // 序号
      rulesForm: {
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
    rulesForm: {
      handler (newV, oldV) {
        if (newV.registered_time) {
          console.log('we',newV.registered_time)
        }
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
     * 获取传参
     */
    getParams() {
      let options = this.$route.query.options;
      console.log("传参", options);
      this.id = options.id;
      this.rulesForm.contract_time = options.contract_time;
      this.rulesForm.telephone = options.telephone;
      this.rulesForm.registered_time = options.registered_time;
      this.rulesForm.unit_name = options.unit_name;
			this.rulesForm.contract_time = options.contract_time;
			this.rulesForm.remarks = options.remarks;
    },

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
      let Api = "/api/activity/edit";
      let requestData = {
        id: this.id,
        contract_time: this.rulesForm.contract_time,
        telephone: this.rulesForm.telephone,
        registered_time: this.formatDate(this.rulesForm.registered_time),
        unit_name: this.rulesForm.unit_name,
        contract_time: this.formatDate(this.rulesForm.contract_time),
        remarks: this.rulesForm.remarks,
        status: 1,
        alarm_level: 3
      };

      const res = await this.$Http.axiosPost(Api, requestData);
      if (res.code === 200) {
        this.$alert("已经修改成功", "修改结果", {
          confirmButtonText: "确认",
          callback: action => {
            this.$router.replace({
              path: "/homepage"
            });
          }
        });
      }
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
    this.getParams();
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
