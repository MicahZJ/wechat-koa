<template>
  <div id="hello">
    <el-menu
      class="el-menu-wrapper"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      :default-active="activeIndex"
      active-text-color="#409EFF"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <router-link to="/homePage">处理中心</router-link>
      </el-menu-item>
      <el-menu-item index="3">关于我们</el-menu-item>
      <el-header style="text-align: right; font-size: 12px;z-index: 2;">
        <el-dropdown @command="handleCommand">
          <!-- <span class="heart-class"></span> -->
          <span class="el-dropdown-link" style="color: white;cursor: pointer">
            退出登录<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="1">编辑</el-dropdown-item> -->
            <el-dropdown-item command="2">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="nick-class">{{ userInfo.nickName }}</span>
      </el-header>
    </el-menu>
    <br />
    <router-view />
  </div>
</template>

<script src="./control.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" src="./style.styl"></style>
