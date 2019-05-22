import publicHeader from "components/header_public/index";
import {axiosPost} from "../../api/api";

export default {
	data () {
		return {
			id: '', // 序号
			title: "", // 标题
			author: "", // 作者
			tag: "", // 显隐
      textarea:'' // 文章内容
		};
	},
	watch: {},
	computed: {},
	components: {
		publicHeader
	},
	methods: {
    
    /**
		 * 获取传参
     */
		getParams() {
			let options = this.$route.query.options
			console.log('传参', options)
			this.id = options.id
			this.title = options.title
			this.author = options.name
			this.tag = options.tag === 0 ? '隐藏': options.tag === 1 ? '显示' : '隐藏'
			this.textarea = options.article
		},
  
		/**
		 * 保存新数据
		 */
		async saveNewData() {
			let Api = '/api/activity/edit'
			let requestData = {
				id : this.id,
        title : this.title,
        author : this.author,
        tag : this.tag === '隐藏' ? 0 : this.tag === '显示' ? 1 : 0,
        textarea : this.textarea,
			}
			
			const res = await axiosPost(Api, requestData)
			if (res.code === 200) {
        this.$alert('恭喜大王，已经修改成功', '修改结果', {
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
		this.getParams()
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