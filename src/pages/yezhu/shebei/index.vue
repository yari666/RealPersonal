<!---业主-污水站管理----->
<template>
  <div class="main p20">
    <!-- 筛选项 -->
    <div class="search-box">
      <el-form :inline="true" class="demo-form-inline fl">
        <el-form-item label="关键词">
          <el-input
            placeholder="请输入关键词"
            v-model="params.KeyWord"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            style="background: #28adca"
            @click="search()"
            >查询</el-button
          >
        </el-form-item>
      </el-form>

      <div class="fr">
        <el-button class="add-btn" @click="add">新增</el-button>
        <el-button type="primary" class="ml10">导出数据</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      show-summary
      border
      style="width: 100%"
      max-height="700"
    >
      <el-table-column
        label="所属污水站"
        prop="sewageStationName"
      ></el-table-column>

      <el-table-column prop="deviceName" label="设备名称"></el-table-column>

      <el-table-column
        prop="designProcess"
        label="设备工艺"
        width="120px"
      ></el-table-column>

      <el-table-column
        prop="designedOutletWater"
        width="100px"
        label="设计出水量"
      ></el-table-column>

      <el-table-column
        prop="treatmentWater"
        width="100px"
        label="处理水量m³/d"
      ></el-table-column>

      <el-table-column
        prop="totalEnergyConsumption"
        width="100px"
        label="总能耗KW.h"
      ></el-table-column>

      <el-table-column
        prop="singleWaterEnergyConsumption"
        label="单水能耗KW.h/m³"
        width="140px"
      ></el-table-column>

      <el-table-column
        prop="creationTime || '-'"
        label="当前状态/时间"
      ></el-table-column>

      <el-table-column prop="operations" label="运维方"></el-table-column>

      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <span class="base-font" @click="edit(scope.row)">编辑</span>
          <span class="danger-font ml10" @click="del(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="params.MaxResultCount"
        layout="prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>

    <!-- 弹框内容 -->
    <el-dialog
      :close-on-click-modal="false"
      title="创建设备/套"
      :visible.sync="open"
      width="40%"
    >
      <add-machine
        v-if="open"
        :open="open"
        :openType="openType"
        :formData="formData"
        @closeDialog="closeDialog"
      ></add-machine>
    </el-dialog>
  </div>
</template>

<script>
const timestamp = require("time-stamp");
import areaType from "~/components/areaType";
import addMachine from "./add";

import { DeviceList, DelDevice } from "~/config/api.js";

export default {
  data() {
    return {
      tableData: [],
      totalCount: 0,
      open: false,
      openType: "",

      params: {
        KeyWord: "",
        Sorting: "",
        SkipCount: 0, //略过多少条
        MaxResultCount: 10, //每页显示10条
      },
      formData: {
        id: "",
        deviceName: "",
        designedOutletWater: "",
        designProcessId: "",
        sewageStationId: "",
        designProcess: "",
        sewageStationName: "",
      },
    };
  },
  created() {
    this.getDeviceList();
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.userId;
    },
  },
  components: { areaType, addMachine },
  methods: {
    // 查询
    search() {
      this.params.SkipCount = 0;
      this.getDeviceList();
    },

    // 获取设备列表
    getDeviceList() {
      let obj = Object.assign({}, this.params, { UserId: this.userId });

      DeviceList(obj).then((res) => {
        if (res.data) {
          res.data.items.forEach((item) => {
            item.creationTime = timestamp(
              "YYYY-MM-DD HH:mm:ss",
              new Date(item.creationTime)
            );
          });
          this.totalCount = res.data.totalCount;
          this.tableData = res.data.items;
        }
      });
    },

    add() {
      this.open = true;
      this.openType = "add";
    },

    edit(row) {
      this.formData = {
        id: row.id,
        deviceName: row.deviceName,
        designedOutletWater: row.designedOutletWater,
        designProcessId: row.designProcessId,
        sewageStationId: row.sewageStationId,
        designProcess: row.designProcess,
        sewageStationName: row.sewageStationName,
      };

      this.open = true;
      this.openType = "edit";
    },

    del(row) {
      this.$confirm("是否确定删除此台设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          DelDevice({ Id: row.id }).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getDeviceList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 关闭弹框
    closeDialog(e) {
      this.open = false;
      this.getDeviceList();
    },

    // 切换页
    handleCurrentChange(val) {
      this.params.SkipCount = parseInt((val - 1) * this.params.MaxResultCount);
      this.getDeviceList();
    },
  },
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
