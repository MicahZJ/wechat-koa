import publicHeader from "components/header_public/index";

export default {
  name: "homepage",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ], //表格数据
      input: "", //查询输入框数据
      activeIndex: "1", //导航条默认选项
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
	  
    indexMethod(index) {
      return index;
    },
	
	  /**
	   * 跳转新增页面
	   */
	  toAddPages() {
	    console.log('222')
		  this.$router.push({
			  path: "/addNew"
		  });
	  },
  
    /**
     * 跳转修改页
     */
    toEditPage() {
      this.$router.push({
        path: "/editInfo"
      });
    },
  },
  components: {
    publicHeader
  }
};
