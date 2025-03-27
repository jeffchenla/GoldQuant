import React from 'react';
import AssetValueChart from '../charts/AssetValueChart';

const AssetManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">资产管理</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          添加资产
        </button>
      </div>

      {/* 资产概览卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">总资产</h3>
          <p className="text-2xl font-bold text-gray-800">¥1,234,567</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">今日盈亏</h3>
          <p className="text-2xl font-bold text-green-600">+¥12,345</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">持仓市值</h3>
          <p className="text-2xl font-bold text-gray-800">¥987,654</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">可用资金</h3>
          <p className="text-2xl font-bold text-gray-800">¥246,913</p>
        </div>
      </div>

      {/* 资产价值变化趋势图 */}
      <AssetValueChart />

      {/* 资产列表 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">资产列表</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">资产名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">持仓数量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">当前价格</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">持仓市值</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">盈亏比例</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">比特币</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.5 BTC</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥300,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥150,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+15.2%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">编辑</button>
                  <button className="text-red-600 hover:text-red-900">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetManagement; 