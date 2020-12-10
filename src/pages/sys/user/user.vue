<!---业主-账号管理----->
<template>
  <div class="main">
    <!-- tab -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="平台账号" name="adminUser">
        <admin-user></admin-user>
      </el-tab-pane>
      <el-tab-pane label="业主账号" name="ownerUser">
        <owner-user></owner-user>
      </el-tab-pane>
      <el-tab-pane label="运维账号" name="oprUser">
        <operation-user></operation-user>
      </el-tab-pane>
      <el-tab-pane label="监管账号" name="govUser">
        <gov-user></gov-user>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import adminUser from "./adminuser";
import ownerUser from "./ownerUser";
import operationUser from "./operationUser";
import govUser from "./govUser";

export default {
  data() {
    return {
      activeName: "adminUser",
    };
  },
  components: { adminUser, ownerUser, operationUser, govUser },
  methods: {},
};
</script>

<style lang="less" scoped>
.block {
  text-align: center;
  margin: 15px auto 0;
}
.w100 {
  width: 120px;
}
.tab-type {
  position: absolute;
  top: 0;
  right: 0;
}
.search-box {
  position: relative;
  margin-bottom: 10px;
}
.el-select {
  width: 120px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input {
  width: 400px;
}
</style>
