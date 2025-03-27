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
      text: 'BTC/USDT 市场深度',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: '价格 (USDT)',
      },
    },
    y: {
      title: {
        display: true,
        text: '数量 (BTC)',
      },
    },
  },
};

// 生成模拟数据
const generateData = (start: number, end: number, count: number) => {
  const data = [];
  const step = (end - start) / count;
  for (let i = 0; i <= count; i++) {
    data.push(start + step * i);
  }
  return data;
};

const prices = generateData(44000, 46000, 100);
const bids = prices.map(price => Math.random() * 100);
const asks = prices.map(price => Math.random() * 100);

const data = {
  labels: prices.map(price => price.toFixed(0)),
  datasets: [
    {
      label: '买单',
      data: bids,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      fill: true,
    },
    {
      label: '卖单',
      data: asks,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      fill: true,
    },
  ],
};

const MarketDepthChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line options={options} data={data} />
    </div>
  );
};

export default MarketDepthChart; 