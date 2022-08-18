<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">{{ user }}</p>
            <p class="access">{{ usern }}</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-8-15</span></p>
          <p>上次登录地点：<span>合肥</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <!-- 订单数据 -->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图 -->
      <el-card style="height: 280px">
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <!-- 内容区域柱状图及饼状图 -->
      <div class="graph">
        <!-- 柱状图 -->
        <el-card style="height: 260px">
          <div style="height: 240px" ref="userEcharts"></div>
        </el-card>
        <!-- 饼状图 -->
        <el-card style="height: 260px">
          <div style="height: 240px" ref="videoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../../api/data.js'
import * as echarts from 'echarts'
export default {
  name: 'Home',
  data() {
    return {
      user: 'Admin',
      usern: '系统管理员',
      userImg: require('@/assets/images/user.jpeg'),
      tableData: [
        {
          name: 'oppo',
          todayBuy: 69,
          monthBuy: 324,
          totalBuy: 948,
        },
        {
          name: 'vivo',
          todayBuy: 70,
          monthBuy: 366,
          totalBuy: 920,
        },
        {
          name: '苹果',
          todayBuy: 95,
          monthBuy: 458,
          totalBuy: 986,
        },
        {
          name: '小米',
          todayBuy: 94,
          monthBuy: 322,
          totalBuy: 864,
        },
        {
          name: '三星',
          todayBuy: 54,
          monthBuy: 374,
          totalBuy: 826,
        },
        {
          name: '魅族',
          todayBuy: 48,
          monthBuy: 286,
          totalBuy: 680,
        },
        {
          name: '华为',
          todayBuy: 102,
          monthBuy: 649,
          totalBuy: 1248,
        },
      ],
      tableLabel: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买',
      },
      countData: [
        {
          name: '今日支付订单',
          value: 312,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏订单',
          value: 426,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 520,
          icon: 's-goods',
          color: '#5ab1ef',
        },
        {
          name: '本月支付订单',
          value: 1648,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 2849,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月未支付订单',
          value: 1835,
          icon: 's-goods',
          color: '#5ab1ef',
        },
      ],
    }
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data
      if (code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: 'line',
          })
        })

        const option = {
          xAxis: {
            data: xData,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          series,
        }
        // 绘入折线图
        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)

        // 柱状图
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: '#333',
            },
          },
          grid: {
            left: '20%',
          },
          // 提示框
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category', // 类目轴
            data: data.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: '#17b3a3',
              },
            },
            axisLabel: {
              interval: 0,
              color: '#333',
            },
          },
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#17b3a3',
                },
              },
            },
          ],
          color: ['#2ec7c9', '#b6a2de'],
          series: [
            {
              name: '新增用户',
              data: data.userData.map((item) => item.new),
              type: 'bar',
            },
            {
              name: '活跃用户',
              data: data.userData.map((item) => item.active),
              type: 'bar',
            },
          ],
        }
        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption)

        // 饼图
        const videoOption = {
          tooltip: {
            trigger: 'item',
          },
          color: [
            '#0f78f4',
            '#dd536b',
            '#9462e5',
            '#a6a6a6',
            '#e1bb22',
            '#39c362',
            '#3ed1cf',
          ],
          series: [
            {
              data: data.videoData,
              type: 'pie',
            },
          ],
        }
        const V = echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption)
      }
    })
  },
}
</script>

<style></style>
