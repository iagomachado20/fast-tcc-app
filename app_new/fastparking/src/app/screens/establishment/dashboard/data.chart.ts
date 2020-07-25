export const chartData = [
  {
    label: 'Diário',
    value: 300
  },
  {
    label: 'Semanal',
    value: 2000
  },
  {
    label: 'Mensal',
    value: 10000
  }
];

export const dataSource = {
  chart: {
    caption: 'Balanço Financeiro', // Set the chart caption // Set the chart subcaption // Set the x-axis name
    yAxisName: 'Valor',
    numberPreffix: 'R$', // Set the y-axis name
    numberSuffix: '',
    theme: 'fusion',
    baseFont: 'Poppins' // Set the theme for your chart
  },
  // Chart Data - from step 2
  data: chartData
};
