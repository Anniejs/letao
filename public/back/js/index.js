//echarts数据可视化的工具  柱状图和饼状图
$(function(){
  var echarts1 = echarts.init(document.querySelector('.echarts_left'));

        // 指定图表的配置项和数据
        var option1 = {
          title: {
              text: '2018年注册人数'
          },
          tooltip: {},
          legend: {
              data:['人数']
          },
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '人数',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      };

      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(option1);


      var echarts2 = echarts.init(document.querySelector('.echarts_right'));

      // 指定图表的配置项和数据
      var option2 = {
        title : {
          text: '热门品牌销售',
          subtext: '2018年11月',
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['耐克','阿迪达斯','万斯','新百伦','李宁']
      },
      series : [
          {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'耐克'},
                  {value:310, name:'阿迪达斯'},
                  {value:234, name:'万斯'},
                  {value:135, name:'新百伦'},
                  {value:1548, name:'李宁'}
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
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts2.setOption(option2);


})
