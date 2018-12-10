<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="title1"></el-input>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="link1"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="author1"></el-input>
      </el-form-item>
      <el-form-item label="显隐" style="width: 250px">
        <el-select v-model="tag1" placeholder="请选择">
          <el-option label="显示" value="1"></el-option>
          <el-option label="隐藏" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="./control.js"></script>

<style scoped lang="stylus" src="./style.styl"></style>