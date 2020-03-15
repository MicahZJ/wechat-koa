<template>
  <div id="edit-wrapper">
    <el-upload
      class="avatar-uploader"
      action=""
      :http-request="coverUpLoad"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script src="./control.js"></script>
<style lang="stylus" scoped src="./style.styl"></style>
