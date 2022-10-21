export const rightData1 = {
  tooltip: {
    trigger: 'axis'
  },
<<<<<<< HEAD
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
    data: []
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
      data: [],
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
}

export const rightData2 = {
  legend: {
    data: ['防疫人员', '隔离人员'],
    left: '65%',
    top: '5%',
    itemHeight: 15,
    itemWidth: 15
  },
  tooltip: {},
  xAxis: {
    data: [],
    name: '学院',
    axisLine: { onZero: true },
    splitLine: { show: false },
    splitArea: { show: false },
    axisLabel: {
      rotate: 30
    }
  },
  yAxis: {
=======
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
    data: []
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
>>>>>>> c9584a6 (feat: 统计分析)
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
      data: [],
      lineStyle: { // 设置线条的style等
        normal: {
          color: '#10C8C0', // 折线线条颜色:红色,
          width: 3
        }
      },
<<<<<<< HEAD
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
      data: [],
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
=======
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
>>>>>>> c9584a6 (feat: 统计分析)
        normal: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.1,
<<<<<<< HEAD
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
=======
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
>>>>>>> c9584a6 (feat: 统计分析)
              }
            ],
            globalCoord: false // 缺省为 false
          }
        }
<<<<<<< HEAD
      },
      data: []
=======
      }
>>>>>>> c9584a6 (feat: 统计分析)
    }
  ]
}
export const rightData3 = {
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
          fontSize: '20',
          fontWeight: 'bold'
        }
      },
      data:[],
    },
    {
      type:'pie',
      radius: ['40%', '78%'],
      labelLine:{
        normal:{
          length:11,
        }
      },
      color:['#fc867d','#fb9692','#fba459','#f8c94b',
            '#8ca8ee','#90c3f1','#8cc8e9', '#8ecac7',
            '#b3d5d3'],
      data:[],
      label:
          {
            normal: {
              // textStyle: {
              //   // color: '#aaa'     //提示框字体颜色
              // }
            }
          },
    }]
}
