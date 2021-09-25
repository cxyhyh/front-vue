<template>
  <div>
     
    <div class="filter-container">
      <el-select
        v-model="companys.companyName"
        placeholder="请选择企业名称"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="cn in companyNameOption"
          :key="cn.companyName"
          :value="cn.companyName"
          :label="cn.companyName"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="companys.companyType"
        placeholder="请选择企业类型"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="ct in companyTypeOption"
          :key="ct.companyType"
          :value="ct.companyType"
          :label="ct.companyType"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="companys.location"
        placeholder="请选择位置"
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="lo in locationOption"
          :key="lo.location"
          :value="lo.location"
          :label="lo.location"
        >
        </el-option>
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="pageCompany()"
      >
        查询
      </el-button>
    </div>
    <div>
      <el-table
        class="etab"
        :data="companys"
        ref="multipleTable"
        tooltip-effect="dark"
        border
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
        <el-table-column prop="companyName" label="企业名称" min-width="70">
          <template slot-scope="props">
            <span>{{ props.row.companyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="companyType" label="企业类型" min-width="30">
          <template slot-scope="props">
            <span>{{ props.row.companyType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="foundTime" label="成立时间" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.foundTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="联系地址" min-width="120">
          <template slot-scope="props">
            <span>{{ props.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="telephone" label="联系电话" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.telephone }}</span>
          </template>
        </el-table-column>
        <el-table-column type="expand" label="详情" min-width="50">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="id">
                <span>{{ props.row.companyId }}</span>
              </el-form-item>
              <el-form-item label="企业名称">
                <span>{{ props.row.companyName }}</span>
              </el-form-item>
              <el-form-item label="企业类型">
                <span>{{ props.row.companyType }}</span>
              </el-form-item>
              <el-form-item label="成立时间">
                <span>{{ props.row.foundTime }}</span>
              </el-form-item>
              <el-form-item label="员工人数">
                <span>{{ props.row.employNum }}</span>
              </el-form-item>
              <el-form-item label="所在位置">
                <span>{{ props.row.location }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.telephone }}</span>
              </el-form-item>
              <el-form-item label="联系地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="邮政编码">
                <span>{{ props.row.postalCode }}</span>
              </el-form-item>
              <el-form-item label="网址">
                <span>{{ props.row.http }}</span>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="企业简介">
                <span>{{ props.row.introduce }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8, 16, 32, 64]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next, total, jumper "
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
require("echarts/theme/shine");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import {
  pageCompany,
  getCompanyName,
  getCompanyType,
  getLocation,
} from "../../../request/api";
export default {
  name: "company",
  components: {},
  data() {
    return {
      chartPie: null,
      currentPage: 1,
      pageSize: 8,
      total: 0,
      companys: [],
      companyNameOption: [],
      companyTypeOption: [],
      locationOption: [],
      multipleSelection: [],
      classStatus: false,
      expands: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      xzqy: false,
      form: {
        companyName: "",
        companyType: "",
        foundTime: "",
        employNum: "",
        location: "",
        telephone: "",
        address: "",
        postalCode: "",
        http: "",
        email: "",
        introduce: "",
        companyId: "",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    // this.initCharts();
    // this.initData();
    this.pageCompany();
    this.getCompanyName();
    this.getCompanyType();
    this.getLocation();
  },
  methods: {
    
  
    toogleExpand(row) {
      const $table = this.$refs.data;
      this.list.map((item) => {
        if (row.id !== item.id) {
          $table.toggleRowExpansion(item, false);
        }
      });
      $table.toggleRowExpansion(row);
    },
    getCompanyName() {
      getCompanyName({})
        .then((res) => {
          this.companyNameOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getCompanyType() {
      getCompanyType({})
        .then((res) => {
          this.companyTypeOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getLocation() {
      getLocation({})
        .then((res) => {
          this.locationOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    pageCompany() {
      pageCompany({
        current: this.currentPage,
        size: this.pageSize,
        companyName: this.companys.companyName,
        companyType: this.companys.companyType,
        location: this.companys.location,
      })
        .then((res) => {
          this.companys = res.data.records;
          this.total = Number(res.data.total);

          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageCompany(val, 1);
      this.currentPage = 1;
    },
    //显示第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageCompany(this.pagesize, val);
    },
  },
};
</script>
<style scoped>
.zzt{
  width:400px;
  height:300px;
  margin-left: 150px;
  margin-top: -300px;

}
#main1{
  margin-left: 700px;
  width: 400px; 
  height: 300px;

}
.line-wrap {
  width: 50%;
  height: 400px;
}
.tip {
  font-size: 30px;
  text-align: left;
}
.card {
  width: 250px;
  height: 150px;
  margin-left: 40px;

  background-color: rgba(50, 109, 235, 0.61);
}
.filter-container {
  line-height: 60px;
}
.col {
  font-size: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.item {
  margin: 4px;
}
.block {
  text-align: center;
}
</style>