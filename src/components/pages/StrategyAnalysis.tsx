import React from 'react';
import StrategyBacktestChart from '../charts/StrategyBacktestChart';

const StrategyAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">策略分析</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          创建新策略
        </button>
      </div>

      {/* 策略概览 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">运行中策略</h3>
          <p className="text-2xl font-bold text-gray-800">3</p>
          <p className="text-sm text-gray-500">较上月 +1</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">总收益率</h3>
          <p className="text-2xl font-bold text-green-600">+25.6%</p>
          <p className="text-sm text-gray-500">年化收益率</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">最大回撤</h3>
          <p className="text-2xl font-bold text-red-600">-8.3%</p>
          <p className="text-sm text-gray-500">风险控制</p>
        </div>
      </div>

      {/* 策略列表 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">策略列表</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">策略名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收益率</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">运行时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">双均线策略</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    运行中
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+15.2%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30天</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">编辑</button>
                  <button className="text-red-600 hover:text-red-900">停止</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">网格交易策略</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    运行中
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+8.5%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15天</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">编辑</button>
                  <button className="text-red-600 hover:text-red-900">停止</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 策略回测结果 */}
      <StrategyBacktestChart />
    </div>
  );
};

export default StrategyAnalysis; 