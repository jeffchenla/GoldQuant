import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '策略回测结果',
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        callback: function(value) {
          return `${Number(value).toFixed(2)}%`;
        },
      },
    },
  },
};

const labels = ['1月', '2月', '3月', '4月', '5月', '6月'];

const data = {
  labels,
  datasets: [
    {
      label: '策略收益率',
      data: [0, 5.2, 8.5, 12.3, 15.2, 25.6],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.4,
    },
    {
      label: '基准收益率',
      data: [0, 3.1, 5.8, 8.2, 10.5, 18.3],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.4,
    },
  ],
};

const StrategyBacktestChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line options={options} data={data} />
    </div>
  );
};

export default StrategyBacktestChart; 