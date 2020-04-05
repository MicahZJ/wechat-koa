import { mapGetters } from "vuex";
import publicHeader from "components/header_public/index";
// import elTableInfiniteScroll from 'el-table-infinite-scroll';

export default {
  // directives: {
  //   'el-table-infinite-scroll': elTableInfiniteScroll
  // },
  data() {
    return {
      tableData: [], // 当前页所有数据
      selectData: [], // 选中数据
      totalLength: 10, // 纵数据数量
      search: "", //查询输入框数据
      pages: 1, // 初始页
      row: {}, // 当前行信息
      valueMaintain: "",
      showBlock: false,
    };
  },
  wather: {
    valueMaintain: {
      handler(newV, oldV) {

      },
      deep: true
    }
  },
  methods: {
    /**
     * 添加列样式
     * @param {table} param0 
     */
    addClass({columnIndex}){
      if(columnIndex === 3 || columnIndex === 2){
        return 'cell-special'
      }    
    },

    /**
     * 设置警报level样式
     */
    tableRowClassName({ row, rowIndex }) {
      // console.log("row", rowIndex, row.alarm_level);
      if (row.alarm_level === 1) {
        return "serious-row";
      } else if (row.alarm_level === 2) {
        return "warning-row";
      } else {
        return "";
      }
    },

    /**
     *  当前选中
     * @param key
     */
    handleSelect(key) {
      console.log(key, "选中某个");
      this.selectData = key;
    },

    /**
     * 序号显示？
     * @param index
     * @returns {*}
     */
    indexMethod(index) {
      return index + 1;
    },

    /**
     * 当前页
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    load () {
      console.log(23232323)
      this.pages += 1;
      this.getArticleList();
    },

    /**
     * 搜索
     */
    handleSearch(key, keyPath) {
      console.log("搜索", key);
    },

    /**
     * 获取列表数据
     */
    async getArticleList() {
      let Api = "/api/activity/record_list";
      let requestData = {
        page: this.pages,
        limit: 12
      };

      const res = await this.$Http.axiosPost(Api, requestData);
      if (res.code === 200) {
        this.tableData = this.formatList(res.data.articleList);
        this.totalLength = res.data.totalLength;
        console.log("arr", this.tableData);
      }
    },

    // 格式化数组
    formatList(arr) {
      let newArr = [];
      arr.map(item => {
        newArr.push({
          id: item.id,
          unit_name: item.unit_name,
          telephone: item.telephone,
          registered_time: item.registered_time,
          contract_time: item.contract_time,
          maintain_time: item.maintain_time,
          remarks: item.remarks,
          alarm_level: item.alarm_level,
          alarm14:item.alarm14,
          alarm15:item.alarm15
        });
      });
      return newArr;
    },

    /**
     * 跳转新增页面
     */
    toAddPages() {
      this.$router.push({
        path: "/addNew"
      });
    },

    /**
     * 跳转修改页
     */
    toEditPage(row) {
      console.log("当前数据", row);
      this.$router.push({
        path: "/editArticle",
        query: {
          options: row
        }
      });
    },

    /**
     * 确认时间
     */
    clickBlock(falg) {
      this.showBlock = false
      if (falg) {
        console.log('time', this.formatDate(this.valueMaintain))
        this.changeAlarmStatus()
      } else {
        this.valueMaintain = ''
      }
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

    // 确认更新
    confirmStatus(row, index) {
      this.$confirm(`此操作会更新（${row.unit_name}）的维保日期， 是否继续?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log(row, index);
        this.showBlock = true
        this.row = []
        this.row = row
        // this.changeAlarmStatus(row)
      })
      .catch(() => {
        this.$refs.multipleTable.clearSelection();
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    },

    /**
     * 更新警报状态
     * @param {} row 
     */
    async changeAlarmStatus() {
      let api = "/api/activity/change_alarm_level";
      let requestData = {
        id: this.row.id,
        unit_name: this.row.unit_name,
        alarm14: this.row.alarm14,
        alarm15: this.row.alarm15,
        maintain_time: this.formatDate(this.valueMaintain),
        alarm_level: 3
      }
      let res = await this.$Http.axiosPost(api, requestData)
      if (res.code === 200) {
        this.valueMaintain = ''
        this.getArticleList();
        this.$message({
          type: "success",
          message: "更新成功"
        });
      }
    },

    /**
     * 删除当前数据
     */
    async deleteInfo(row, index) {
      console.log("当前数据", row);
      let Api = `/api/activity/delete`;
      let requestData = {
        id: row.id,
        status: 0,
        deleteStatus: 0
      };

      const res = await this.$Http.axiosPost(Api, requestData);
      if (res.code === 200) {
        this.tables.splice(index, 1)
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }
    },

    /**
     * 删除指定数据
     */
    confirmDeleteLimit() {
      let arr = [];
      this.selectData.forEach(row => {
        console.log("row", row);
        arr.push(row.id);
        this.$refs.multipleTable.toggleRowSelection(row);
      });
      this.$confirm("此操作会删除已选中的数据， 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.deleteLimit(arr);
        })
        .catch(() => {
          this.$refs.multipleTable.clearSelection();
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    /**
     * 清除所有数据
     */
    confirmDeleteAll() {
      let arr = [];
      this.tableData.forEach(row => {
        console.log("row", row);
        arr.push(row.id);
        this.$refs.multipleTable.toggleRowSelection(row);
      });
      this.$confirm("此操作会删除整页数据， 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.deleteLimit(arr);
        })
        .catch(() => {
          this.$refs.multipleTable.clearSelection();
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    async deleteLimit(arr) {
      let Api = `/api/activity/delete`;
      let requestData = {
        id: arr,
        status: 0,
        deleteStatus: 1
      };

      const res = await this.$Http.axiosPost(Api, requestData);
      if (res.code === 200) {
        setTimeout(() => {
          this.getArticleList();
        }, 500);
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    tables() {
      let search = this.search;
      if (search) {
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return (
              String(dataNews[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.tableData;
    }
  },
  components: {
    publicHeader
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
    this.getArticleList();
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
