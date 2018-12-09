<template>
  <div class="hello">
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1"><router-link to="/listBlog">处理中心</router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
      </el-submenu>
      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">关于我们</a></el-menu-item>
    </el-menu>
    <br>
  </div>
</template>

<script src="./control.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" src="./style.styl"></style>