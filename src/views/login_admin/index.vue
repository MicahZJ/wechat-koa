<template>
	<el-row>
		<el-col :span="24">
			<div class="loginBox">
				<el-form :model="userInfo" status-icon :rules="rules" ref="userInfo" label-width="0px" class="demo-ruleForm">
					<el-form-item prop="username">
						<el-input type="text" v-model="userInfo.username" auto-complete="off" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item prop="pass">
						<el-input type="password" v-model="userInfo.pass" auto-complete="off" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item>
						<div class="operator">
							<el-button type="primary" @click="testLogin('userInfo')">登录</el-button>
							<el-button @click="resetForm('userInfo')">重置</el-button>
						</div>
					</el-form-item>
				</el-form>
		</div>
		</el-col>
	</el-row>
</template>

<script src="./control.js"></script>
<style lang="stylus" scoped src="./style.styl"></style>
