import React from 'react';
import MarketDepthChart from '../charts/MarketDepthChart';

const MarketAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">市场分析</h2>
        <div className="flex space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>24小时</option>
            <option>7天</option>
            <option>30天</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>所有市场</option>
            <option>加密货币</option>
            <option>股票</option>
            <option>期货</option>
          </select>
        </div>
      </div>

      {/* 市场概览 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">BTC/USDT</h3>
          <p className="text-2xl font-bold text-gray-800">$45,000</p>
          <p className="text-sm text-green-600">+2.5%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">ETH/USDT</h3>
          <p className="text-2xl font-bold text-gray-800">$3,200</p>
          <p className="text-sm text-red-600">-1.2%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">24h成交量</h3>
          <p className="text-2xl font-bold text-gray-800">$128B</p>
          <p className="text-sm text-gray-500">较昨日 +5.3%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">市场情绪</h3>
          <p className="text-2xl font-bold text-gray-800">中性</p>
          <p className="text-sm text-gray-500">RSI: 52</p>
        </div>
      </div>

      {/* 市场深度图 */}
      <MarketDepthChart />

      {/* 交易对列表 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">热门交易对</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易对</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最新价格</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h涨跌幅</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h成交量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">趋势</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BTC/USDT</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$45,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+2.5%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$28.5B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">上升</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ETH/USDT</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$3,200</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">-1.2%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$15.2B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">下降</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis; 