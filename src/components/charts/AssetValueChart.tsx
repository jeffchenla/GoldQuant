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
      text: '资产价值变化趋势',
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        callback: function(value) {
          return `¥${Number(value).toLocaleString()}`;
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
      label: '总资产',
      data: [1000000, 1150000, 1080000, 1250000, 1180000, 1234567],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.4,
    },
    {
      label: '持仓市值',
      data: [800000, 920000, 850000, 980000, 900000, 987654],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.4,
    },
  ],
};

const AssetValueChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line options={options} data={data} />
    </div>
  );
};

export default AssetValueChart; 