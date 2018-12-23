import publicHeader from "components/header_public/index";
import {axiosPost} from "../../api/api";

export default {
	data () {
    let checkContent = (rule, value, callback) => {
      let that = this;
      if (value === "") {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
		return {
			title: "",
			author: "",
			tag: "隐藏",
      textarea: "",
      rules: {
        title: [
          {
            validator: checkContent,
            trigger: "blur"
          }
        ],
        author: [
          {
            validator: checkContent,
            trigger: "blur"
          }
        ],
        tag: [
          {
            validator: checkContent,
            trigger: "blur"
          }
        ],
        textarea: [
          {
            validator: checkContent,
            trigger: "blur"
          }
        ],
      }
		};
	},
	watch: {},
	computed: {},
	components: {
		publicHeader
	},
	methods: {
		/**
		 * 保存新数据
		 */
		async saveNewData() {
			// alert('success')
			let Api = '/api/activity/addNew'
			let requestData ={
        article: this.textarea,
        author: this.author,
        tag: 0,
        title: this.title,
			}
			
			const res = await axiosPost(Api, requestData)
			if (res.code === 200) {
        this.$alert('恭喜大王，新增一条记录', '修改结果', {
          confirmButtonText: '已阅',
          callback: action => {
            this.$router.replace({
              path: "/homepage"
            })
          }
        });
			}
		},
	},
	beforeCreate () {
		/*
		* 实例初始化后，创建完成之前被调用
		*/
		console.log ('1. beforeCreate');
	},
	created () {
		/*
		* 实例创建完成后被立即调用，这个时候还没有开始挂载 不能访问
		*/
		console.log ('2. created');
	},
	beforeMount () {
		/*
		* 挂载开始之前调用，即将开始挂载
		*/
		console.log ('3. beforeMount');
	},
	mounted () {
		/*
		* 实例挂载之后调用，但是并不是所有子组件也都一起挂载完成
		*/
		console.log ('5. mounted');
	},
	beforeUpdate () {
		/*
		* 数据更新完成前调用，发生在虚拟DOM重新渲染和打补丁前，在这里进一步的更改状态，不会触发重新渲染
		*/
		console.log ('6. beforeUpdate');
	},
	updated () {
		/*
		* 更改数据重新渲染虚拟DOM后调用
		*/
		console.log ('8. updated');
	},
	beforeDestroy () {
		/*
		* 实例销毁之前调用，在这一步，实例仍然可用
		*/
		console.log ('9. beforeDestroy');
	},
	destroyed () {
		console.log ('10. destroyed');
	}
};