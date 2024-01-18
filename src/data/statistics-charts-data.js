import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [3, 2, 1, 2, 1, 1, 4],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Accuracy",
      data: [40, 44, 59, 63, 62, 70, 75, 78, 83],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};
const pieChart = {
  type: 'pie',
  height: 220,
  series: [3, 2, 1, 2, 1, 1, 4],
  options: {
    colors: ['#388e3c', '#f44336', '#ff9800', '#2196f3', '#9c27b0', '#795548', '#607d8b'],
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  },
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Predictions",
    description: "This Week Predictions",
    footer: "campaign sent 3 days ago",
    chart: websiteViewsChart,
  },
  // {
  //   color: "white",
  //   title: "pie Chart",
  //   description: "This Week Predictions",
  //   footer: "campaign sent 3 days ago",
  //   chart: pieChart,
  // },
  {
    color: "white",
    title: "Our Accuracy",
    description: "15% increase in total accuracy",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Helps Conducted",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
