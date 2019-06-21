<template>
  <div class="hello">
    <div id="chart1"></div>
    <div id="chart2"></div>
    <div id="chart3"></div>
  </div>
</template>

<script>
  // 这里之所以使用 require 而不是 import，是因为 require 可以直接从 node_modules 中查找，而 import 必须把路径写全。
  // 引入基本模板
  //let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  //require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  //require('echarts/lib/component/tooltip')
  //require('echarts/lib/component/title')

  export default {
    name: "echarts",
    data() {
      return {}
    },
    mounted() {
      this.drawLine();
      this.drawPie();
    },
    methods: {
      drawZLine() {

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('chart3'));
        var data ={};
        this.$axios.get('https://echarts.baidu.com/examples/data/asset/data/aqi-beijing.json', {

        }).then(res => {
          console.log("123");
        }).catch(err => {
          this.isShow = false;
          console.log(err)
        });
        myChart.setOption({
          title: {
            text: 'Beijing AQI'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: data.map(function (item) {
              return item[0];
            })
          },
          yAxis: {
            splitLine: {
              show: false
            }
          },
          toolbox: {
            left: 'center',
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [{
            startValue: '2014-06-01'
          }, {
            type: 'inside'
          }],
          visualMap: {
            top: 10,
            right: 10,
            pieces: [{
              gt: 0,
              lte: 50,
              color: '#096'
            }, {
              gt: 50,
              lte: 100,
              color: '#ffde33'
            }, {
              gt: 100,
              lte: 150,
              color: '#ff9933'
            }, {
              gt: 150,
              lte: 200,
              color: '#cc0033'
            }, {
              gt: 200,
              lte: 300,
              color: '#660099'
            }, {
              gt: 300,
              color: '#7e0023'
            }],
            outOfRange: {
              color: '#999'
            }
          },
          series: {
            name: 'Beijing AQI',
            type: 'line',
            data: data.map(function (item) {
              return item[1];
            }),
            markLine: {
              silent: true,
              data: [{
                yAxis: 50
              }, {
                yAxis: 100
              }, {
                yAxis: 150
              }, {
                yAxis: 200
              }, {
                yAxis: 300
              }]
            }
          }
        })
      },
      drawPie() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('chart2'));
        // 绘制图表
        var weatherIcons = {
          'Sunny': 'https://echarts.baidu.com/examples/data/asset/img/weather/sunny_128.png',
          'Cloudy': 'https://echarts.baidu.com/examples/data/asset/img/weather/cloudy_128.png',
          'Showers': 'https://echarts.baidu.com/examples/data/asset/img/weather/showers_128.png'
        };

        myChart.setOption({
          title: {
            text: '天气情况统计',
            subtext: '虚构数据',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['西凉', '益州', '兖州', '荆州', '幽州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {
                  value: 1548,
                  name: '幽州',
                  label: {
                    normal: {
                      formatter: [
                        '{title|{b}}{abg|}',
                        '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                        '{hr|}',
                        '  {Sunny|}{value|202}{rate|55.3%}',
                        '  {Cloudy|}{value|142}{rate|38.9%}',
                        '  {Showers|}{value|21}{rate|5.8%}'
                      ].join('\n'),
                      backgroundColor: '#eee',
                      borderColor: '#777',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                        title: {
                          color: '#eee',
                          align: 'center'
                        },
                        abg: {
                          backgroundColor: '#333',
                          width: '100%',
                          align: 'right',
                          height: 25,
                          borderRadius: [4, 4, 0, 0]
                        },
                        Sunny: {
                          height: 30,
                          align: 'left',
                          backgroundColor: {
                            image: weatherIcons.Sunny
                          }
                        },
                        Cloudy: {
                          height: 30,
                          align: 'left',
                          backgroundColor: {
                            image: weatherIcons.Cloudy
                          }
                        },
                        Showers: {
                          height: 30,
                          align: 'left',
                          backgroundColor: {
                            image: weatherIcons.Showers
                          }
                        },
                        weatherHead: {
                          color: '#333',
                          height: 24,
                          align: 'left'
                        },
                        hr: {
                          borderColor: '#777',
                          width: '100%',
                          borderWidth: 0.5,
                          height: 0
                        },
                        value: {
                          width: 20,
                          padding: [0, 20, 0, 30],
                          align: 'left'
                        },
                        valueHead: {
                          color: '#333',
                          width: 20,
                          padding: [0, 20, 0, 30],
                          align: 'center'
                        },
                        rate: {
                          width: 40,
                          align: 'right',
                          padding: [0, 10, 0, 0]
                        },
                        rateHead: {
                          color: '#333',
                          width: 40,
                          align: 'center',
                          padding: [0, 10, 0, 0]
                        }
                      }
                    }
                  }
                },
                {value: 535, name: '荆州'},
                {value: 510, name: '兖州'},
                {value: 634, name: '益州'},
                {value: 735, name: '西凉'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('chart1'))
        // 绘制图表
        myChart.setOption({
          title: {text: '在Vue中使用echarts'},
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      }
    }
  }
</script>

<style scoped>
  #chart1 {
    float: left;
    width: 300px;
    height: 300px;
  }

  #chart2 {
    float: left;
    width: 700px;
    height: 300px;
  }

  #chart3 {
    float: left;
    width: 300px;
    height: 300px;
  }
</style>
