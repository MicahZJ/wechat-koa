<template>
  <div>
    <public-header />
    <!--搜索框-->
    <el-row>
      <el-col :span="2" class="grid">
        <el-button
          type="success"
          icon="el-icon-search"
          size="mini"
          @click="handleSearch()"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="3" class="grid">
        <el-input v-model="search" placeholder="请输入单位名称" size="mini">
        </el-input>
      </el-col>
      <!--新增按钮-->
      <el-col :span="6">
        <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="toAddPages()"
        round
        >新增</el-button
      >
      <!--删除按钮-->
      <el-button
        v-show="this.selectData.length > 0"
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="confirmDeleteLimit()"
        round
        >删除选中</el-button
      >
      <!--全删按钮-->
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="confirmDeleteAll()"
        round
        >全删</el-button
      >
      </el-col>
    </el-row>
    <br />
    <!--表格数据及操作-->
    <el-table
      :data="tables"
      border
      style="width: 100%"
      ref="multipleTable"
      tooltip-effect="dark"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelect"
    >
      <!--勾选框-->
      <el-table-column type="selection" width="55"> </el-table-column>
      <!--索引-->
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="unit_name" label="单位名称"></el-table-column>
      <el-table-column prop="telephone" label="联系电话"> </el-table-column>
      <el-table-column
        prop="registered_time"
        label="年检日期"
        sortable
      ></el-table-column>
      <el-table-column
        prop="contract_time"
        label="合同日期"
        sortable
      ></el-table-column>
      <el-table-column
        prop="maintain_time"
        label="维保日期"
        sortable
      ></el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="toEditPage(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="info"
            icon="el-icon-s-promotion"
            size="mini"
            @click="confirmStatus(scope.row, scope.$index)"
            >维保完成</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <br />
    <br />
    <!--分页条-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="this.totalLength"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script src="./control.js"></script>

<style lang="stylus" src="./style.styl"></style>
