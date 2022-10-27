<template>
  <div class="page-container" >
    <div id="allmap"></div>
    <div class="top-box flex-space-between-center">
      <div class="top-item" v-for="(item,index) in topData" :key="item.id">
        <el-card class="top-item-card"  shadow="never">
          <div>
            <div class="top-title" :style="{background: `linear-gradient(to right, ${bgColor[index]},#FFFFFF)`}">{{item.title}}</div>
          </div>
          <div style="display: flex;">
            <img src="../../../assets/images/s1.png" v-show="index === 0" style="width: 40%;" alt="">
            <img src="../../../assets/images/s2.png" v-show="index === 1" style="width: 40%;" alt="">
            <img src="../../../assets/images/s3.png" v-show="index === 2" style="width: 40%;" alt="">
            <img src="../../../assets/images/s4.png" v-show="index === 3" style="width: 40%;" alt="">
            <div style="margin-left: 20px">
              <div class="number">{{item.num}}</div>
              同比
              <el-icon v-if="item.is_add" style="color: #ff0000"><CaretTop /></el-icon>
              <el-icon v-if="!item.is_add" style="color: #00a205"><CaretBottom /></el-icon>
              {{Math.abs(item.vary)}}%
            </div>
         </div>
        </el-card>
      </div>
    </div>
    <div class="right-box">
      <div class="right-box-item" style="position: relative">
        <div class="title">各学院防疫人员/隔离人员配比</div>
        <div id="c1" style="position: absolute; width: 100%;height: 100%; top: 0"></div>
      </div>
      <div class="right-box-item">
        <div class="title">各学院防疫人员占比</div>
        <div id="c2" style="width: 80%;height: 70%; margin: 0 auto;"></div>
      </div>
      <div class="right-box-item" style="position: relative">
        <div class="title">新增隔离人数趋势</div>
        <div id="c3" style="position: absolute; width: 100%;height: 100%; top: 0"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import * as echarts from 'echarts'
import {
  CountDeptEpidemicNum,
  CountDeptPeopleProportion, CountNewIsolationList,
  CountPeopleDistribution
} from "../../../api/administrator/query";
import { rightData1,rightData2, rightData3 } from "./echarsOptions";

const bgColor = reactive([
    '#F63D2E','#FD7F13','#FDBA04','#10C8C0'
])
const topData = ref([
  {id: 0, title: '总隔离人数', num: 0, vary: 0, is_add: null},
  {id: 1, title: '新增隔离人数', num: 0, vary: 0, is_add: null},
  {id: 2, title: '新增解除人数', num: 0, vary: 0, is_add: null},
  {id: 3, title: '昨日请假人数', num: 0, vary: 0, is_add: null}
])
onMounted(() => {
  loadMapScript()
  handleCharts()
  handleDistributedCharts()
  getPeopleDistribution()
  getDeptPeopleProportion()
  getDeptEpidemicNum()
  getNewIsolationList()
})
const getPeopleDistribution = () => {
  CountPeopleDistribution().then(res => {
    topData.value[0].num = res.data.allIsolationNum
    topData.value[0].vary = res.data.allIsolationPercent
    topData.value[0].is_add = res.data.allIsolationPositive
    topData.value[1].num = res.data.newIsolationNum
    topData.value[1].vary = res.data.newIsolationPercent
    topData.value[1].is_add = res.data.newIsolationPositive
    topData.value[2].num = res.data.newRemoveNum
    topData.value[2].vary = res.data.newRemovePercent
    topData.value[2].is_add = res.data.newRemovePositive
    topData.value[3].num = res.data.leaveYesterdayNum
    topData.value[3].vary = res.data.leaveYesterdayPercent
    topData.value[3].is_add = res.data.leaveYesterdayPositive
  })
}
const getDeptPeopleProportion = () => {
  CountDeptPeopleProportion().then(res => {
    console.log('res1', res)
    res.data.epidemicList.forEach(item => {
      data2.value.xAxis.data.push(item.name)
      data2.value.series[0].data.push(item.count)
    })
    res.data.isolatedList.forEach(item => {
      data2.value.series[1].data.push(item.count)
    })
    handleCharts()
  })
}
const getDeptEpidemicNum = () => {
  CountDeptEpidemicNum().then(res => {
    res.data.data.forEach(item => {
      data3.value.series[0].data.push({
        value: item.count
      })
      data3.value.series[1].data.push({
        value: item.count,
        name: item.name
      })
    })
    handleDistributedCharts()
  })
  console.log(data3.value.series[0].data)

}
const getNewIsolationList = () => {
  CountNewIsolationList().then(res => {
    res.data.data.forEach(item => {
      data.value.xAxis.data.unshift(item.time)
      data.value.series[0].data.unshift({
        value: item.count
      })
    })
    console.log(data.value.series[0].data)
    handleIsolationTrendCharts()
  })
}
const init = () => {
  let AMap = window.AMap;
  let map = new AMap.Map("allmap", {
    rotateEnable:true,
    pitchEnable:true,
    zoom: 19,
    pitch: 50,
    rotation: -15,
    viewMode:'3D', //开启3D视图,默认为关闭
    // zooms:[2,20],
    center: [119.822565,30.292662], //中心点坐标
  });
};
const loadMapScript = () => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.className = "loadmap"; // 给script一个类名
  script.src =
      "https://webapi.amap.com/maps?v=2.0&key=f51cb05359b8b5057feb9330ce138337";
  script.onload = () => {
    init();
  };
  let loadmap = document.getElementsByClassName("loadmap");
  if (loadmap) {
    // 每次append script之前判断一下，避免重复添加script资源标签
    for (var i = 0; i < loadmap.length; i++) {
      document.body.removeChild(loadmap[i]);
    }
  }
  document.body.appendChild(script);
}
const data = ref(rightData1)
const handleIsolationTrendCharts = () => {
  const myChart = echarts.init(document.getElementById('c3'))
  myChart.setOption(data.value, true)
  window.addEventListener("resize", () => {
    myChart.resize();
  })
}
const data2 = ref(rightData2)
const handleCharts = () => {
  const myChart = echarts.init(document.getElementById('c1'))
  myChart.setOption(data2.value, true)
  window.onresize = () => {
    myChart.resize()
  }
}
const data3 = ref(rightData3)
const handleDistributedCharts = () => {
  const myChart = echarts.init(document.getElementById('c2'))
  myChart.setOption(data3.value, true)
  window.onresize = () => {
    myChart.resize()
  }
}
</script>

<style lang="less" scoped>

#allmap {
  // 注意给dom宽高，不然地图不出来
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}
.page-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;
  .top-box {
    position: absolute;
    bottom: 10px;
    z-index: 2;
    width: 70%;
    height: 190px;
    .top-item {
      flex-basis: 24%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 10px;
      .top-item-card {
        width: 100%;
        height: 98%;
        border-radius: 10px;
        :deep(.el-card__body) {
          width: 100%;
          height: 100%;
          padding: 10px 10px 20px 10px;
          display: flex;
          border-radius: 10px;
          flex-direction: column;
          justify-content: space-between;
          background: #F5FAFD;
        }
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .right-box {
    position: absolute;
    z-index: 2;
    width: 29%;
    height: 100%;
    right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .right-box-item {
      flex-basis: 30%;
      background: #F5FAFD;
      border-radius: 10px;
      .title {
        padding: 5px 0 5px 5px;
        font-family: titleFont;
        width: 90%;
        font-size: 24px;
        color: #4B5960;
      }
    }
  }
}
.top-title {
  font-family: titleFont;
  width: 84%;
  letter-spacing: 5px;
  height: 40px;
  border-radius: 10px 10px 100px 10px;
  color: #fff;
  font-size: 24px;
  line-height: 40px;
  padding-left: 20px;
}
.number {
  font-family: numberFont;
  color: #4B5960;
  font-size: 42px;
  font-weight: bolder;
  text-align: right;
}
</style>
