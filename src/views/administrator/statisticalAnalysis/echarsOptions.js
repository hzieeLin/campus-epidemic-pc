export const rightData1 = {
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
