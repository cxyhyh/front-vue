<template>
  <div>
    <div>
      <h1 class="tip">申请职位基本信息(仅管理员可查看)</h1>
    </div>
    <div class="filter-container">
      <el-input
        v-model="application.username"
        placeholder="请输入用户名称"
        style="width: 150px"
        class="filter-item"
      >
      </el-input>
      <el-select
        v-model="application.applicationPosition"
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
      <el-select
        v-model="application.status"
        placeholder="请选择审核状态"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="s in statusPosition"
          :key="s.status"
          :value="s.status"
          :label="s.status"
        >
        </el-option>
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="pageApplication()"
      >
        查询
      </el-button>
    </div>

    <div>
      <el-table
        class="etab"
        :data="application"
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
        <el-table-column
          prop="applicationId"
          label="applicationId"
          min-width="40"
        >
          <template slot-scope="props">
            <span>{{ props.row.applicationId }}</span>
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
        <el-table-column prop="status" label="简历审核状态" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="60">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="通过审核"
              placement="top-start"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-document-checked"
                circle
                @click="tongGuo(scope.row.username,scope.row.applicationPosition)"
              ></el-button>
            </el-tooltip>
             <el-tooltip
              class="item"
              effect="dark"
              content="未通过审核"
              placement="top-start"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-document-delete"
                circle
                @click="buTongGuo(scope.row.username,scope.row.applicationPosition)"
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
  pageApplication,
  getStatus,
  tongGuo,
  buTongGuo,
  deleteApplication,
  getApplicationPositionForA,
} from "../../../request/api";
export default {
  name: "application",
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      application: [],
      statusPosition: [],
      applicationPositionOption: [],
      multipleSelection: [],
      classStatus: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      xzjl: false,
      form1: {
        applicationId: "",
        username: "",
        status: "",
        applicationPosition: "",
      },
      form: {
        applicationId: "",
        username: "",
        status: "",
        applicationPosition: "",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.pageApplication();
    this.getStatus();
    this.getApplicationPositionForA();
  },
  methods: {
    getStatus() {
      getStatus({})
        .then((res) => {
          this.statusPosition = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getApplicationPositionForA() {
      getApplicationPositionForA({})
        .then((res) => {
          this.applicationPositionOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    deleteApplication(applicationId) {
      deleteApplication({
        applicationId,
      })
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("删除成功！！");
          this.pageApplication();
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
          this.deleteApplication(row.applicationId);
        })
        .catch(() => {});
    },
    tongGuo(username, applicationPosition) {
      tongGuo({
        username,
        applicationPosition,
      })
        .then((res) => {
          const flag = res.data;
          const code = res.code;
          if (flag == true) {
            this.pageApplication();
            this.$message("审核已通过！");
          }
          if (code == 400) {
            this.$message("该用户还没有申请该职位，请按规定流程先申请该职位！");
          }
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    buTongGuo(username, applicationPosition) {
      buTongGuo({
        username,
        applicationPosition,
      })
        .then((res) => {
          const flag = res.data;
          const code = res.code;
          if (flag == true) {
            this.pageApplication();
            this.$message("审核未通过！");
          }
          if (code == 400) {
            this.$message("该用户还没有申请该职位，请按规定流程先申请该职位！");
          }
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    pageApplication() {
      pageApplication({
        current: this.currentPage,
        size: this.pageSize,
        username: this.application.username,
        applicationPosition: this.application.applicationPosition,
        status: this.application.status,
      })
        .then((res) => {
          this.application = res.data.records;
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
      this.pageApplication(val, 1);
      this.currentPage = 1;
    },
    //显示第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageApplication(this.pageSize, val);
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