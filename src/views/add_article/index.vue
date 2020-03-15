<template>
  <div id="add-wrapper">
    <public-header />
    <el-form class="box" :model="ruleForm" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="单位名称" prop="unit_name">
        <el-input v-model="ruleForm.unit_name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="telephone">
        <el-input v-model="ruleForm.telephone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="注册日期" prop="registered_time">
        <el-col :span="3">
          <el-date-picker v-model="ruleForm.registered_time" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="合同日期" prop="contract_time">
        <el-col :span="3">
          <el-date-picker v-model="ruleForm.contract_time" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-col>
      </el-form-item>
       <el-form-item label="备注" prop="remarks">
        <el-input v-model="ruleForm.remarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveNewData()">立即添加</el-button>
        <el-button type="info" @click="backHome()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="./control.js"></script>

<style scoped lang="stylus" src="./style.styl"></style>