<template>
  <div>
    <public-header />
    <!--搜索框-->
    <el-row>
      <el-col :span="3" class="grid">
        <el-input v-model="input" placeholder="请输入内容" size="mini">
        </el-input>
      </el-col>
      <el-col :span="1" class="grid">
        <el-button
          type="success"
          icon="el-icon-search"
          size="mini"
          @click="handleSelect"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <br />
    <!--表格数据及操作-->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      stripe
      ref="multipleTable"
      tooltip-effect="dark"
    >
      <!--勾选框-->
      <el-table-column type="selection" width="55"> </el-table-column>
      <!--索引-->
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180" sortable>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="编辑" width="100">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >编辑</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="删除" width="100">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <br />
    <!--新增按钮-->
    <el-row>
      <el-button
        type="success"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="toAddPages()"
        round
        >新增</el-button
      >
      <!--全删按钮-->
      <el-button type="danger" icon="el-icon-delete" size="mini" round
        >全删</el-button
      >
    </el-row>
    <br />
    <!--分页条-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100"
    ></el-pagination>
  </div>
</template>

<script src="./control.js"></script>

<style scoped lang="stylus" src="./style.styl"></style>
