<template>
  <div id="edit-wrapper">
    <public-header />
    <el-form class="box" :model="rulesForm" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="单位名称" prop="unit_name">
        <el-input v-model="rulesForm.unit_name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="telephone">
        <el-input v-model="rulesForm.telephone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="注册日期" prop="registered_time">
        <el-col :span="3">
          <el-date-picker
            v-model="rulesForm.registered_time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="合同日期" prop="contract_time">
        <el-col :span="3">
          <el-date-picker
            v-model="rulesForm.contract_time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="rulesForm.remarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveNewData()">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="./control.js"></script>

<style scoped lang="stylus" src="./style.styl"></style>
