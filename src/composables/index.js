import { ref } from "vue";
import { getParkInfoAPI } from "../apis/park";
import * as echarts from "echarts";

export function useGetParkInfo() {
  const parkInfo = ref({});
  const getParkInfo = async () => {
    const res = await getParkInfoAPI();
    parkInfo.value = res.data;
  };
  return {
    parkInfo,
    getParkInfo,
  };
}

export function useInitBarChart(parkInfo) {
  const barChart = ref(null);
  const initBarChart = () => {
    const { parkIncome } = parkInfo.value;
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(barChart.value);

    // 指定图表的配置项和数据
    myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        // 让图表占满容器
        top: "10px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
            show: false,
          },
          data: parkIncome.xMonth,
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "园区年度收入",
          type: "bar",
          barWidth: "10px",
          data: parkIncome.yIncome.map((item, index) => {
            const color =
              index % 2 === 0
                ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0.23, color: "#74c0f8" },
                    { offset: 1, color: "rgba(116,192,248,0.00)" },
                  ])
                : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0.23, color: "#ff7152" },
                    { offset: 1, color: "rgba(255,113,82,0.00)" },
                  ]);
            return { value: item, itemStyle: { color } };
          }),
        },
      ],
      textStyle: {
        color: "#B4C0CC",
      },
    });
  };
  return {
    barChart,
    initBarChart,
  };
}

export function useInitPieChart(parkInfo) {
  const pieChart = ref(null);
  const initPieChart = () => {
    const { parkIndustry } = parkInfo.value;
    var chartDom = pieChart.value;
    var myChart = echarts.init(chartDom);
    var option = {
      color: ["#00B2FF", "#2CF2FF", "#892CFF", "#FF624D", "#FFCF54", "#86ECA2"],
      legend: {
        itemGap: 20,
        bottom: "0",
        icon: "rect",
        itemHeight: 10, // 图例icon高度
        itemWidth: 10, // 图例icon宽度
        textStyle: {
          color: "#c6d1db",
        },
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "园区产业分析",
          type: "pie",
          radius: ["55%", "60%"], // 设置内圈与外圈的半径使其呈现为环形
          center: ["50%", "40%"], // 圆心位置， 用于调整整个图的位置
          tooltip: {
            trigger: "item",
            formatter: (params) => {
              return `${params.seriesName}</br><div style='display:flex;justify-content: space-between;'><div>${params.marker}${params.name}</div><div>${params.percent}%</div></div>`;
            },
          },
          label: {
            show: false,
            position: "center",
          },
          data: parkIndustry,
        },
      ],
    };

    option && myChart.setOption(option);
  };
  return {
    pieChart,
    initPieChart,
  };
}
