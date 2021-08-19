<template>
  <div>
    <div>
      <h1 class="tip">角色基本信息(仅管理员可查看)</h1>
    </div>
    <div class="filter-container">
      <el-select
        v-model="jianLi.username"
        placeholder="请选择用户名称"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="uo in usernameOption"
          :key="uo.username"
          :value="uo.username"
          :label="uo.username"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="jianLi.applicationPosition"
        placeholder="请选择申请岗位"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="apo in applicationPositionOption"
          :key="apo.applicationPosition"
          :value="apo.applicationPosition"
          :label="apo.applicationPosition"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="jianLi.fileName"
        placeholder="请输入简历名称"
        class="filter-item"
        style="width: 150px"
      >
      </el-input>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="pageJianLi()"
      >
        查询
      </el-button>
    </div>

    <div>
      <el-table
        class="etab"
        :data="jianLi"
        ref="multipleTable"
        tooltip-effect="dark"
        border
        fit
        highlight-current-row
        :cell-style="{
          color: '#666',
          fontFamily: 'Arial',
          fontSize: '14px',
          textAlign: 'center',
        }"
        :header-cell-style="{
          fontFamily: 'Helvetica',
          fontSize: '17px',
          textAlign: 'center',
        }"
      >
        <el-table-column prop="jianliId" label="jianliId" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.jianliId }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fileUrl" label="简历存放路径" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.fileUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="简历名称" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名称" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="applicationPosition"
          label="申请岗位"
          min-width="40"
        >
          <template slot-scope="props">
            <span>{{ props.row.applicationPosition }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="60">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="下载简历"
              placement="top-start"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-download"
                circle
                @click="downloadFile(scope.row.fileName)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-start"
            >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="Delete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next, total, jumper "
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  pageJianLi,
  downloadFile,
  deleteJianLi,
  getUserName,
  getApplicationPosition,
} from "../../../request/api";
export default {
  name: "jianLi",
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      jianLi: [],
      usernameOption: [],
      applicationPositionOption: [],
      multipleSelection: [],
      classStatus: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      xzjl: false,
      form1: {
        jianliId: "",
        fileUrl: "",
        fileName: "",
        username: "",
        applicationPosition: "",
      },
      form: {
        jianliId: "",
        fileUrl: "",
        fileName: "",
        username: "",
        applicationPosition: "",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.pageJianLi();
    this.getUserName();
    this.getApplicationPosition();
  },
  methods: {
    getUserName() {
      getUserName({})
        .then((res) => {
          this.usernameOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getApplicationPosition() {
      getApplicationPosition({})
        .then((res) => {
          this.applicationPositionOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    deleteJianLi(jianliId) {
      deleteJianLi({
        jianliId,
      })
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("删除成功！！");
          this.pageJianLi();
          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("删除失败！！");
          console.log(err);
        });
    },
    Delete(row) {
      this.$confirm(`确定删除这条删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // let data = { ...row};
          // this.form = data;
          this.deleteJianLi(row.jianliId);
        })
        .catch(() => {});
    },
    downloadFile(fileName) {
      downloadFile({
        fileName,
      })
        .then((res) => {
          // this.$message("文件下载成功");
          console.log(res);
          const blob = new Blob([res], { type: "application/octet-stream" });
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    pageJianLi() {
      pageJianLi({
        current: this.currentPage,
        size: this.pageSize,
        username: this.jianLi.username,
        applicationPosition: this.jianLi.applicationPosition,
        fileName: this.jianLi.fileName,
      })
        .then((res) => {
          this.jianLi = res.data.records;
          this.total = Number(res.data.total);
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    toogleExpand(row) {
      const $table = this.$refs.data;
      this.list.map((item) => {
        if (row.id !== item.id) {
          $table.toggleRowExpansion(item, false);
        }
      });
      $table.toggleRowExpansion(row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageJianLi(val, 1);
      this.currentPage = 1;
    },
    //显示第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageJianLi(this.pageSize, val);
    },
  },
};
</script>

<style scoped>  
.but {
  width: 100px;
  border: solid red;
}

.etab {
  margin-left: 0px;
  border-radius: 5px;
}
.tip {
  text-align: center;
  color: white;
}
.col {
  font-size: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.item {
  margin: 4px;
}
.el-input {
  width: 300px;
}
.block {
  text-align: center;
}
</style>