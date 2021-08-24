<template>
  <div class="ai-wrapper">
    <h3 class="flex-a-start"><div class="vertical"></div><div>AI预警系统</div></h3>
    <div class="block-left">
      <div class="block-title">各类型告警占比统计</div>
      <div class="block-picker">
        <el-date-picker
          v-model="form.typeDate"
          class="block-date-picker"
          :editable="false"
          type="daterange"
          :picker-options="pickerOptions"
          range-separator="~"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="yyyy/MM/dd"
          @change='getWarningType("type")'
        />
        <el-button-group class="block-button-picker">
          <el-button
            @click='getWarningType("type", "week")'
          >
            本周
          </el-button>
          <el-button
            @click='getWarningType("type", "month")'
          >
            本月
          </el-button>
          <el-button
            @click='getWarningType("type", "year")'
          >
            本年
          </el-button>
        </el-button-group>
      </div>
      <div id="block-left-chart" />
    </div>
    <div class="block-right">
      <div class="block-title">各监控点告警数量占比统计</div>
      <div class="block-picker">
        <el-date-picker
          v-model="form.addressDate"
          class="block-date-picker"
          :editable="false"
          type="daterange"
          :picker-options="pickerOptions"
          range-separator="~"
          format="yyyy/MM/dd"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change='getwarningAddress("address")'
        />
        <el-button-group class="block-button-picker">
          <el-button
            @click='getwarningAddress("address", "week")'
          >
            本周
          </el-button>
          <el-button
            @click='getwarningAddress("address", "month")'
          >
            本月
          </el-button>
          <el-button
            @click='getwarningAddress("address", "year")'
          >
            本年
          </el-button>
        </el-button-group>
      </div>
      <div id="block-right-chart" />
    </div>
    <div class="block-bottom">
      <div class="block-title">各类型告警发生量统计</div>
      <div class="block-bottom-picker">
        <el-date-picker
          v-model="form.trendDate"
          class="block-date-picker"
          :editable="false"
          type="daterange"
          :picker-options="pickerOptions"
          range-separator="~"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="yyyy/MM/dd"
          @change='getwarningTrend("trend")'
        />
        <el-button-group class="block-button-picker">
          <el-button
            @click='getwarningTrend("trend", "week")'
          >
            本周
          </el-button>
          <el-button
            @click='getwarningTrend("trend", "month")'
          >
            本月
          </el-button>
          <el-button
            @click='getwarningTrend("trend", "year")'
          >
            本年
          </el-button>
        </el-button-group>
      </div>
      <div id="block-bottom-chart" />
    </div>
  </div>
</template>

