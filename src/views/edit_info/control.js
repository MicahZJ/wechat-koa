import publicHeader from "components/header_public/index";

export default {
	data () {
		return {
			title: "",
			link: "",
			author: "",
			tag: ""
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
		saveNewData() {
			alert('success')
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