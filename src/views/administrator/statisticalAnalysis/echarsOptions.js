export let topDatas = {
  legend: {
    data: ['防疫人员', '隔离人员'],
    left: '10%'
  },
  brush: {
    toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
    xAxisIndex: 0
  },
  toolbox: {
    feature: {
      magicType: {
        type: ['stack']
      },
      dataView: {}
    }
  },
  tooltip: {},
  xAxis: {
    data: ['文学院', '计算机学院','教育学院','体育科学学院','医学院','护理学院','公共卫生学院','商学院','艺术学院'],
    name: '学院',
    axisLine: { onZero: true },
    splitLine: { show: false },
    splitArea: { show: false }
  },
  yAxis: {},
  grid: {
    bottom: 100
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
      data: [11,22,33,44,55,66,77,88,99]
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
      data: [99,88,77,66,55,44,33,22,11]
    }
  ]
}
