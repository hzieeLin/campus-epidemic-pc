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
              同比 {{Math.abs(item.vary)}}% <el-icon v-if="item.vary > 0" style="color: #ff0000"><CaretTop /></el-icon><el-icon v-else style="color: #00a205"><CaretBottom /></el-icon>
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
const bgColor = reactive([
    '#F63D2E','#FD7F13','#FDBA04','#10C8C0'
])
const topData = ref([
  {id: 0, title: '总隔离人数', num: 122, vary: -10},
  {id: 1, title: '新增隔离人数', num: 1, vary: 16},
  {id: 2, title: '新增解除人数', num: 3, vary: 2},
  {id: 3, title: '昨日请假人数', num: 5, vary: -30}
])
onMounted(() => {
  loadMapScript()
  handleCharts()
  handleIsolationTrendCharts()
  handleDistributedCharts()
})

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
const data = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['新增隔离人数'],
        top: '5%',
        right: '4%',
        color: '#0093ff'
  },
  grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
  },
  xAxis: {
    type: 'category',
        boundaryGap: false,
        nameLocation: 'center',
        splitLine: {
      show: false,
          lineStyle: {
        color: '#ebebeb'
      }
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    nameGap: 10,
        nameTextStyle: {
      fontSize: 14,
          padding: [0, 0, 10, 0]
    },
    data: ["05-01",
      "05-02",
      "05-03",
      "05-04",
      "05-05",
      "05-06",
      "05-07"]
  },
  yAxis: {
    type: 'value',
        axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    minInterval: 1,
        nameGap: 20,
        nameLocation: 'center',
        nameRotate: '90',
        nameTextStyle: {
      fontSize: 14,
          padding: [0, 0, 0, 0, 0]
    },
    splitLine: {
      // 网格线
      lineStyle: {
        type: 'dashed'
      },
      show: true
    }
  },
  series: [
    {
      name: '新增隔离人数',
      type: 'line',
      stack: 'Total',
      symbol: 'circle',
      symbolSize: 7,
      data: [
    {year: '', value: 3},
    {year: '', value: 10},
    {year: '', value: 10},
    {year: '', value: 5},
    {year: '', value: 7},
    {year: '', value: 2},
    {year: '', value: 3}
      ],
      lineStyle: { // 设置线条的style等
        normal: {
          color: '#10C8C0', // 折线线条颜色:红色,
          width: 3
        }
      },
      itemStyle : {
        color:{     //渐变  属性值 同CSS
          type:"linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#10C8C0' // 0% 处的颜色
          }, {
            offset: 1, color: '#fff' // 100% 处的颜色
          }],
        }
      },
      areaStyle: {
        normal: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.1,
                color: '#D2F4F3' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: '#DBF6F6' // 0% 处的颜色
              },
              {
                offset: 0.8,
                color: '#EBF9FA' // 0% 处的颜色
              },
              {
                offset: 0.9,
                color: '#F9FDFE' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        }
      }
    }
  ]
})
const handleIsolationTrendCharts = () => {
  const myChart = echarts.init(document.getElementById('c3'))
  myChart.setOption(data.value, true)
  window.addEventListener("resize", () => {
    myChart.resize();
  })
}
const data2 = ref( {
  legend: {
    data: ['防疫人员', '隔离人员'],
    left: '65%',
    top: '5%',
    itemHeight: 15,
    itemWidth: 15
  },
  tooltip: {},
  xAxis: {
    data: ['文学院', '计算机学院','教育学院','体育科学学院','医学院','护理学院','公共卫生学院','商学院','艺术学院'],
    name: '学院',
    axisLine: { onZero: true },
    splitLine: { show: false },
    splitArea: { show: false },
    axisLabel: {
      rotate: 30
    }
  },
  yAxis: {
    splitLine: {
      // 网格线
      lineStyle: {
        type: 'dashed'
      },
      show: true
    }
  },
  series: [
    {
      name: '防疫人员',
      type: 'bar',
      stack: 'one',
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      },
      itemStyle: {
        normal: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.1,
                color: '#10C8C0' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: '#4acdc7' // 0% 处的颜色
              },
              {
                offset: 0.8,
                color: '#e5fcfa' // 0% 处的颜色
              },
              {
                offset: 0.9,
                color: '#f8fffd' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        }
      },
      data: [11,22,33,44,55,66,77,88,99],
      barWidth:'20%',
    },
    {
      name: '隔离人员',
      type: 'bar',
      stack: 'one',
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      },
      itemStyle: {
        normal: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.1,
                color: '#FDBA04' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: '#ffcf4d' // 0% 处的颜色
              },
              {
                offset: 0.8,
                color: '#f8e09f' // 0% 处的颜色
              },
              {
                offset: 0.9,
                color: '#f8f6fc' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        }
      },
      data: [99,88,77,66,55,44,33,22,11]
    }
  ]
})
const handleCharts = () => {
  const myChart = echarts.init(document.getElementById('c1'))
  myChart.setOption(data2.value, true)
  window.onresize = () => {
    myChart.resize()
  }
}
const data3 = ref({
  legend: {                       //图例
    show:false,                   //是否显示图例
    orient: 'vertical',           //布局方向
    x: 'left'                    //图例相对
  },
  series: [                       //内容
    {
      name:'',      //内容标题
      type:'pie',                 //图标样式
      selectedMode: 'single',     //选中模式：单选
      radius: ['40%', '70%'],         //饼图大小，[x,y]:x表示内半径，y表示外半径
      label: {                    //标签
        show: false,
        position: 'center'
      },
      labelLine: {        //提示框
        normal: {
          show: true     //是否显示
        }
      },
      color:['#fc867d','#fb9692','#fba459','#f8c94b',
        '#8ca8ee','#90c3f1','#8cc8e9', '#8ecac7',
        '#b3d5d3'],   //颜色
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      data:[                                              //数据
        {value:71,name:''},
        {value:79,name:''},
        {value:79,name:''},
        {value:79,name:''},
        {value:79,name:''},
        {value:79,name:''},
        {value:79,name:''},
        {value:79,name:''},
        {value:79,name:''}
      ],
    },
    {
      name:'男女占比',
      type:'pie',
      radius: ['70%', '78%'],
      labelLine:{
        normal:{
          length:2,
        }
      },
      color:['#F63D2E','#ff5a52','#FD7F13','#FDBA04',
        '#2f65ed','#56a9f2','#20a7f1', '#10C8C0',
        '#71d7d1'],   //颜色
      data:[
        {value:71,name:'文学院'},
        {value:79,name:'计算机学院'},
        {value:79,name:'教育学院'},
        {value:79,name:'体育科学学院'},
        {value:79,name:'医学院'},
        {value:79,name:'护理学院'},
        {value:79,name:'公共卫生学院'},
        {value:79,name:'商学院'},
        {value:79,name:'艺术学院'}
      ],
      label:
          {
            normal: {
              // textStyle: {
              //   // color: '#aaa'     //提示框字体颜色
              // }
            }
          },
    }]
})
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
