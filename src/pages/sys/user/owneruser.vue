<template>
  <div>
    <!-- 筛选项 -->
    <div class="search-box">
      <el-input placeholder="请输入内容" v-model="queryInfo.Keyword" clearable>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getOwnerUserList"
        ></el-button>
      </el-input>
      <el-button type="primary" class="fr" @click="add">添加</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      :data="userOwnerList"
      border
      style="width: 100%"
      max-height="700"
      v-loading="isLoadOwner"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column label="账号/手机号" prop="mobilePhone"></el-table-column>
      <el-table-column label="真实姓名" prop="realName"></el-table-column>
      <el-table-column label="角色" prop="roleName"></el-table-column>
      <el-table-column label="业主类型" prop="ownerType">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.ownerType"
            placeholder="请选择"
            disabled
          >
            <el-option
              v-for="item in ownerTypeList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="企业名称" prop="companyName"></el-table-column>
      <el-table-column label="所在区域" prop="area"></el-table-column>
      <el-table-column label="开通时间" prop="turnonDate">
        <template slot-scope="scope">
          <span>
            {{
              scope.row.turnonDate.substr(0, scope.row.turnonDate.indexOf("T"))
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="到期时间" prop="expirationDate">
        <template slot-scope="scope">
          <span>
            {{
              scope.row.expirationDate.substr(
                0,
                scope.row.expirationDate.indexOf("T")
              )
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createDate">
        <template slot-scope="scope">
          <span>
            {{
              scope.row.createDate.substr(0, scope.row.createDate.indexOf("T"))
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="附件" class="files">
        <template slot-scope="scope">
          <div @click="openFile(scope.row)">
            <i class="el-icon-paperclip base-font"></i
            >{{ scope.row.attachmentsList.length || 0 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editDialog(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="removeUserById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <pagedownershow
        :totalOwner="totalOwner"
        :queryInfo="queryInfo"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></pagedownershow>
    </div>

    <!-- 弹框内容 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="openType == 'edit' ? '编辑业主账号' : '创建业主账号'"
      :visible.sync="showOwnerDialog"
      width="40%"
    >
      <add-owner-user
        v-if="showOwnerDialog"
        :open="showOwnerDialog"
        v-on:closeownerdialog="showOwnerDialog = $event"
        :refreshList="getOwnerUserList"
        :openType="openType"
        :formData="formData"
      ></add-owner-user>
    </el-dialog>

    <!-- 上传附件 -->
    <el-dialog
      :close-on-click-modal="false"
      title="附件列表"
      :visible.sync="showFiles"
      width="30%"
      @close="closeDialog"
    >
      <el-upload
        class="upload-demo"
        :action="uploadUrl"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-error="handError"
        :on-success="successUpload"
        :file-list="fileList"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <el-select v-model="remarks" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-dialog>
  </div>
</template>

<script>
// import areaType from "~/components/areaType";
import addOwnerUser from "./addowneruser";
import {
  getPagedOwnerUsers,
  deleteOwnerUser,
  getOwnerType,
} from "~/api/sys/user/user";

import { DelFile } from "~/config/api.js";

import pagedownershow from "~/components/paged";
import { maxResultCount, baseUrl } from "~/config/env";

export default {
  data() {
    return {
      // 获取业主账号列表参数
      queryInfo: {
        UseType: 0,
        Keyword: "",
        Sorting: "",
        SkipCount: 0,
        MaxResultCount: maxResultCount,
      },
      // 数据列表
      userOwnerList: [],
      // 是否显示对话框
      showOwnerDialog: false,
      // 业主账号总数据
      totalOwner: 0,
      // 是否显示loading效果
      isLoadOwner: false,
      ownerTypeList: [],
      // 上传文件地址
      uploadUrl: "",
      // 上传的文件列表
      fileList: [],
      // 是否显示文件上传对话框
      showFiles: false,
      remarks: "logo",
      options: [
        {
          value: "logo",
          label: "Logo",
        },
        {
          value: "cert",
          label: "证件图片",
        },
      ],
      formData: {
        id: "",
        realName: "",
        mobilePhone: "",
        turnonDate: "",
        expirationDate: "",
        // 写死，表示业主账号
        userType: 1,
        roleId: undefined,
        area: [],
        companyName: "",
        companyLegalPerson: "",
        companyMobilePhone: "",
        address: "",
        companyShortenedForm: "",
        companyBusinessScope: "",
        companyRegisteredCapital: 0,
      },
      openType: "",
    };
  },
  created() {
    this.getOwnerUserList();
    this.getOwnerType();
  },
  components: { pagedownershow, addOwnerUser },
  methods: {
    // 获取业主类型
    async getOwnerType() {
      const { data: result } = await getOwnerType(this.$http);

      if (result !== undefined) {
        this.ownerTypeList = result;
      }
    },
    // 得到业主账号列表数据
    async getOwnerUserList() {
      this.isLoadOwner = true;
      const { data: result } = await getPagedOwnerUsers(
        this.$http,
        this.queryInfo
      );

      if (result !== undefined && result.items !== undefined) {
        this.userOwnerList = result.items;
        this.totalOwner = result.totalCount;
      } else {
        this.$message.error("获取业主账号列表失败");
      }
      this.isLoadOwner = false;
    },
    // 监听 pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.MaxResultCount = newSize;
      this.queryInfo.SkipCount = 0;
      this.getOwnerUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.SkipCount = (newPage - 1) * this.queryInfo.MaxResultCount;
      this.getOwnerUserList();
    },
    // 打开新增对话框
    add() {
      this.showOwnerDialog = true;
      this.openType = "add";
    },
    // 打开编辑框
    editDialog(row) {
      this.openType = "edit";

      this.formData = {
        id: row.id,
        realName: row.realName,
        mobilePhone: row.mobilePhone,
        turnonDate: row.turnonDate,
        expirationDate: row.expirationDate,
        // 写死，表示业主账号
        userType: 1,
        roleId: row.roleId,
        ownerType: row.ownerType,
        area: row.area.split("/"),
        companyName: row.companyName,
        companyLegalPerson: row.companyLegalPerson,
        companyMobilePhone: row.companyMobilePhone,
        address: row.address,
        companyShortenedForm: row.companyShortenedForm,
        companyBusinessScope: row.companyBusinessScope,
        companyRegisteredCapital: row.companyRegisteredCapital,
      };
      this.showOwnerDialog = true;
    },
    // 删除业主账号
    async removeUserById(id) {
      // 弹出提示是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该业主账号, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      // 如果业主账号确认删除，则返回字符串confirm
      // 如果业主账号取些删除，则返回字符串cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const { data: result } = await deleteOwnerUser(this.$http, id);

      if (result === "") {
        this.getOwnerUserList();
        this.$message.success("业主账号删除成功");
      } else {
        this.$message.error("业主账号删除失败");
      }
    },
    // 关闭弹框
    closeDialog(e) {
      this.showFiles = false;
      this.getOwnerUserList();
    },
    // 打开附件对话框
    openFile(row) {
      this.uploadUrl =
        baseUrl +
        "attachment/uploadAttachment?guid=" +
        row.companyId +
        "&fileType=0&category=0&categoryName=" +
        row.companyName +
        "&remark=" +
        this.remarks;
      this.fileList = row.attachmentsList;
      this.fileList.forEach((item) => {
        item.url = baseUrl + item.url;
      });

      this.showFiles = true;
    },
    handleRemove(file, fileList) {
      DelFile({ Id: file.id }).then((res) => {
      });
    },
    handError(err, file, fileList) {
      var obj = JSON.parse(err.message)
      this.$message.error(obj.error.message);
    },
    successUpload(response, file, fileList) {
    },
    handlePreview(file) {
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
